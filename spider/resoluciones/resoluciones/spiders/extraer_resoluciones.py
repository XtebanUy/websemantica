# -*- coding: utf-8 -*-
import scrapy
from scrapy.selector import Selector
from resoluciones.items import ResolucionesItem
import functools, operator, re

class ExtraerResolucionesSpider(scrapy.Spider):
    name = 'extraer_resoluciones'
    allowed_domains = ['www.expe.edu.uy']
    start_urls = ['http://www.expe.edu.uy/expe/resoluci.nsf/resolucionesadoptadas06?OpenView&Start=1&Count=30&Expand=1#1']
    #start_urls = ['http://www.expe.edu.uy/expe/resoluci.nsf/5c5cdc5d27c50e8903256f3500602d70/d74196de80143b49032582ea007ac98c?OpenDocument']

    def parse(self, response):
        selector =  Selector(response=response)
        links = selector.xpath('/html/body/table/tr/td[2]/table//tr[count(td) = 3]//a/@href').extract()
        for link in links:
            yield scrapy.Request('http://www.expe.edu.uy'+link, callback=self.parseRepartido)

    def parseRepartido(self, response):
        selector =  Selector(response=response)
        links = selector.xpath('/html/body/table/tr/td[2]/table/tr[count(td) = 5]//a/@href').extract()
        for link in links:
            yield scrapy.Request('http://www.expe.edu.uy'+link, callback=self.parseResolucion)
    
    def parseResolucion(self, response):
        selector =  Selector(response=response)
        url = response.url
        numero = selector.xpath('//input[@name="Res_numero"]/@value').extract_first()
        fecha = selector.xpath('//input[@name="Res_fecha"]/@value').extract_first() #Res_fecha
        texto = functools.reduce(operator.concat, selector.xpath('//input[@name="Res_resumen"]/@value').extract_first())
        #print(texto)
        #texto = selector.xpath('/html/body/form/div[4]/table/tr[2]/td[2]/div/font[1]/text()').extract()
        expediente = re.match('^(\(.+\))', texto).group(1)
        yield ResolucionesItem(url = url, numero = numero, fecha = fecha, texto = texto, expediente = expediente)
