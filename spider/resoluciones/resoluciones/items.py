# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class ResolucionesItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    url = scrapy.Field()
    fecha = scrapy.Field()
    numero =  scrapy.Field()
    texto =  scrapy.Field()
    expediente =  scrapy.Field()

class RepartidoItem(scrapy.Item):
    url = scrapy.Field()
    numero = scrapy.Field()
    fecha_hora = scrapy.Field()
    asistentes_texto = scrapy.Field()
    asistentes = scrapy.Field()
    info_de_la_sesion = scrapy.Field()
    texto =  scrapy.Field()
    resoluciones = scrapy.Field()


    
    
