import scrapy
import os
import time
from crawler.items import AuthenticShoeItem, ShoeItem
from crawler.utils.get_link_attr import get_link_from_file
from scrapy_splash import SplashRequest
from lorem_text import lorem

class AuthenticshoeSpider(scrapy.Spider):
    name = 'authenticshoe'
    allowed_domains = ['authentic-shoes.com']
    urls_file = os.getcwd() + "/crawler/spiders/urls.txt"
    start_urls = get_link_from_file(urls_file)
    headers = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:48.0) Gecko/20100101 Firefox/48.0"}

    counter = 0

#    script = """
#        function main(splash)
#            splash:init_cookies(splash.args.cookies)
#            local url = splash.args.url
#            assert(splash:go(url))
#            assert(splash:wait(5))
#            return{
#                cookies = splash:get_cookies(),
#                html = splash:html(),
#                url = splash:url()
#            }
#        end
#    """

    def start_request(self):
        for url in self.start_urls:
            self.logger.info('Crawing url ...... %s' % url)
            yield SplashRequest(url, self.parse, endpoint="execute", args={"wait": 5}, headers=self.headers)
#            yield SplashRequest(url, self.parse, endpoint="execute", args={"wait": 5, "lua_source": self.script}, headers=self.headers)
    
    def parse(self, response):
        NextPage_Selector = response.css('.nextPage > a::attr("href")').extract_first()
        CurrentPage_Selector = response.css('.page.current::text').extract_first()

        yield from self.scrape(response)
        
        if int(CurrentPage_Selector) < 2:
            yield scrapy.Request(response.urljoin(NextPage_Selector), callback=self.parse)

    def scrape(self, response):
        Product_Selector = response.css('.product-normal')

        if len(Product_Selector) < 1:
            self.logger.info('### ... ... empty data for your req !!!')
        
        for product in Product_Selector:
            
            productpage = product.css('.product-img > a::attr("href")').get()
            thumbnail = "https:" + product.css('.product-img > a > img::attr("data-src")').extract_first()
            yield scrapy.Request(response.urljoin(productpage), self.parse_product, meta={"prod": thumbnail})
            time.sleep(0.2)
    
    def parse_product(self, response):
        self.counter += 1
        item = ShoeItem()
        item['id'] = self.counter
        item['brand'] = (response.css('meta[itemprop*=brand]::attr(content)').get()).title()
        item['currency'] = response.css('meta[itemprop*=priceCurrency]::attr(content)').get()
        item['sku'] = response.css('.hrv-product-reviews > span > meta[itemprop*=sku]::attr(content)').get()
        item['thumbnail'] = response.meta['prod']
        item['title'] = response.css('.bk-product-name::text').get()
        item['price'] = response.css('.bk-product-price::text').get().replace(",","")[:-1]
        item['vote'] = response.css('.hrv-product-reviews-star::attr("data-score")').get()
        item['description'] = lorem.paragraphs(1)
        item['img'] = list(map(lambda x: x.replace('//','https://'),response.css('.bk-product-image::attr("data-src")').extract()))
        yield item
