# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html

import json
from datetime import datetime

class ResolucionesPipeline(object):
    def process_item(self, item, spider):
        return item

class JsonPipeline(object):
    items = []
    first = True
    def open_spider(self, spider):
        self.file = open('repartidos.json', 'w')
        self.file.write("""{
    "@context":{
        "@vocab": "http://www.fing.edu.uy/test/vocab#",
        "@base": "http://www.fing.edu.uy/test/base/",
        "@version": "1.1",
        "resoluciones": {
            "@container": "@set", "@id": "resoluciones" 
        }
    },
    """)
        self.file.write("\"@id\": \"intermedio\",\n")
        self.file.write(""""@graph": [""")
 
    def close_spider(self, spider):
        self.file.write("]}")
        self.file.close()

    def process_item(self, item, spider):

        dict_object = dict(item)
        dict_object["@id"] = "Rep{0}F{1}".format(dict_object["numero"], datetime.strptime(dict_object["fecha_hora"], "%Y-%m-%dT%H:%M:%S").strftime("%Y%m%d"))
        dict_object["@type"] = "Repartido"

        def agregar_tipo_resoluciones(resolucion):
            r = dict(resolucion)
            r["@type"] = "Resolucion"
            r["@id"] = "Res{0}R{1}F{2}".format(r["numero"], dict_object["numero"], datetime.strptime(dict_object["fecha_hora"], "%Y-%m-%dT%H:%M:%S").strftime("%Y%m%d"))
            
            return r
        dict_object["resoluciones"] = [agregar_tipo_resoluciones(r) for r in dict_object["resoluciones"]]
        
        if self.first:
            self.first = False
        else:
            self.file.write(",")

        line = json.dumps(
            dict_object,
            sort_keys=True,
            indent=4,
            separators=(',', ': ')
        ) + "\n"
        self.file.write(line)
        return item