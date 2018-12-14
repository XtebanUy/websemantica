# -*- coding: utf-8 -*-
import scrapy
from scrapy.selector import Selector
import re
import functools
import json
from resoluciones.items import RepartidoItem
from datetime import datetime

class ExtraerRepartidosSpider(scrapy.Spider):
    name = 'extraer_repartidos'
    allowed_domains = ['www.expe.edu.uy']
    start_urls = ['http://www.expe.edu.uy/expe/resoluci.nsf/repartidosfin06?OpenView&Start=1&Count=150&Expand=1#1']
    # 'http://www.expe.edu.uy/expe/resoluci.nsf/repartidosfin06?OpenView&Start=1.30&Count=30&Expand=1#1',
    # 'http://www.expe.edu.uy/expe/resoluci.nsf/repartidosfin06?OpenView&Start=1.60&Count=30&Expand=1#1']

    def parse(self, response):
        selector =  Selector(response=response)
        links = selector.xpath('/html/body/table/tr/td[2]/table//tr[count(td) = 4]//a/@href').extract()
        for link in links:
            yield scrapy.Request('http://www.expe.edu.uy'+link, callback=self.parseRepartido)


    def parseRepartido(self, response):
        selector =  Selector(response=response)
        url = response.url
        texto_selector = selector.xpath('/html/body//table[1]//div[@align="center"]')
        texto_repartido = texto_selector.xpath('string(self::*)').extract_first().strip()
        numero_repartido_text = texto_selector.xpath('string(b[4])').extract_first()
        numero_repartido_match = re.match(r'.*\s(.*)$', numero_repartido_text)
        numero_repartido = numero_repartido_match.group(1).strip() if numero_repartido_match else None
        sesion_hora_text = texto_selector.xpath('string(b[3])').extract_first().strip()
        session_match = re.match(r'Sesión\s([a-zA-Z]*)', sesion_hora_text)
        session = session_match.group(1).strip() if session_match else None
        hora_text = sesion_hora_text.split("\n")[1]
        
        hora_match = re.match(r'.*Hora\s+(\d{1,2}:\d{2})', hora_text)
        
        hora = hora_match.group(1) if hora_match else None
        fecha_match = re.match(r'Sesión\s[a-zA-Z]*\sdel([^\n]*)\n', sesion_hora_text)
        fecha = fecha_match.group(1).strip() if fecha_match else "00:00"

        fecha_hora = datetime.strptime("{0} {1}".format(fecha, hora), "%d/%m/%Y %H:%M")

        asistentes_texto = selector.xpath("//*[contains(text(),'A LA SESION LOS CONSEJEROS:')]/parent::*/following-sibling::text()").extract_first()
        if asistentes_texto:
            asistentes_texto = asistentes_texto.strip()
            
        match_asistentes = re.match(r'DECAN[^:]+: (.+)ORDEN DOCENTE: (.+)ORDEN EGRESADO: (.+)ORDEN ESTUDIANTIL: (.+)$', asistentes_texto)
        asistentes = dict()
        if match_asistentes:
            grupo_decanos = match_asistentes.group(1)
            if grupo_decanos:
                decanos = re.split("(?:, y | y |, e | e |, )", grupo_decanos)
                asistentes["decano"] = list(map(lambda x: x.strip(), filter(None, decanos)))

            grupo_orden_docente = match_asistentes.group(2)
            if grupo_orden_docente:
                orden_docente = re.split("(?:, y | y |, e | e |, )", grupo_orden_docente)
                asistentes["ordenDocente"] = list(map(lambda x: x.strip(), filter(None, orden_docente)))

            grupo_orden_egresado = match_asistentes.group(3)
            if grupo_orden_egresado:
                orden_egresado = re.split("(?:, y | y |, e | e |, )", grupo_orden_egresado)
                asistentes["ordenEgresado"] = list(map(lambda x: x.strip(), filter(None, orden_egresado)))
            
            grupo_orden_estudiantil = match_asistentes.group(4)
            if grupo_orden_estudiantil:
                orden_estuduantil = re.split("(?:, y | y |, e | e |, )", grupo_orden_estudiantil)
                asistentes["ordenEstudiantil"] = list(map(lambda x: x.strip().strip('.'), filter(None, orden_estuduantil)))
            
            
        def extraer_resolucion(acc, current):
            numero = current.xpath(r'text()').extract_first()
            if re.match(r'^\d+\.', numero):
                numero_match =  re.match("(\d+).", numero)
                
                numero = numero_match.group(1) if numero_match else numero

                texto = current.xpath(r'string(following-sibling::ul[1])').extract_first()
                match = re.match(r'^\(([^\)]+)\)', texto)
                expediente_texto = match.group(1) if match else None
                expediente = re.findall("((?:\d|-)+)", expediente_texto)
                elem =  {'texto': texto, 'expediente': expediente , 'numero': numero}
                resoluciones = acc["resoluciones"]
                resoluciones.append(elem)
                return {'prev': elem, 'resoluciones': resoluciones}
            else:
                elem = None
                if acc["prev"]:
                    prev = acc["prev"]
                    texto = prev["texto"] + '\n' + current.xpath('text()').extract_first()
                    elem = {'texto': texto, 'expediente': prev["expediente"], 'numero': prev["numero"]}
                else:
                    texto = current.xpath('text()').extract_first()
                    elem = {'texto': texto, 'expediente': None, 'numero': None}
                resoluciones = acc["resoluciones"]
                
                return {'prev': elem, 'resoluciones': resoluciones}
                
        resoluciones = functools.reduce(extraer_resolucion, selector.xpath('//div[@align="justify"]/font[following-sibling::node()[self::ul]]'), {'prev': None, 'resoluciones': []})
        return RepartidoItem(url = url, numero = numero_repartido, asistentes_texto = asistentes_texto, asistentes = asistentes, texto = texto_repartido, info_de_la_sesion = session, resoluciones = resoluciones["resoluciones"], fecha_hora = fecha_hora.isoformat())
            