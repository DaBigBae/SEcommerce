# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class AuthenticShoeItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    id = scrapy.Field()
    title = scrapy.Field()
    price = scrapy.Field()
    sku = scrapy.Field()
    vote = scrapy.Field()
    description = scrapy.Field()
    thumbnail = scrapy.Field()
    img = scrapy.Field()
    pass

class ShoeItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    id = scrapy.Field()
    title = scrapy.Field()
    brand = scrapy.Field()
    price = scrapy.Field()
    currency = scrapy.Field()
    sku = scrapy.Field()
    vote = scrapy.Field()
    description = scrapy.Field()
    thumbnail = scrapy.Field()
    img = scrapy.Field()
    pass