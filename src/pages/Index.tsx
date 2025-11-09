import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
  suppliers: number;
  inStock: boolean;
  rating: number;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 15000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);

  const categories = [
    { name: 'Цемент', icon: 'Package', count: 234 },
    { name: 'Кирпич', icon: 'Box', count: 189 },
    { name: 'Доски', icon: 'Layers', count: 156 },
    { name: 'Инструменты', icon: 'Wrench', count: 421 },
    { name: 'Краски', icon: 'Paintbrush', count: 312 },
    { name: 'Метизы', icon: 'Hammer', count: 567 },
  ];

  const brands = ['СтройЦемент', 'Makita', 'Боровичи', 'Dulux', 'Fischer', 'Knauf', 'KRASS'];

  const products: Product[] = [
    {
      id: 1,
      name: 'Цемент М500 50кг',
      category: 'Цемент',
      brand: 'СтройЦемент',
      minPrice: 320,
      maxPrice: 450,
      suppliers: 12,
      inStock: true,
      rating: 4.5,
    },
    {
      id: 2,
      name: 'Кирпич керамический полнотелый',
      category: 'Кирпич',
      brand: 'Боровичи',
      minPrice: 18,
      maxPrice: 28,
      suppliers: 8,
      inStock: true,
      rating: 4.8,
    },
    {
      id: 3,
      name: 'Доска обрезная 25×150×6000',
      category: 'Доски',
      brand: 'KRASS',
      minPrice: 850,
      maxPrice: 1200,
      suppliers: 15,
      inStock: false,
      rating: 4.2,
    },
    {
      id: 4,
      name: 'Перфоратор Makita HR2470',
      category: 'Инструменты',
      brand: 'Makita',
      minPrice: 8500,
      maxPrice: 12000,
      suppliers: 6,
      inStock: true,
      rating: 4.9,
    },
    {
      id: 5,
      name: 'Краска водоэмульсионная 10л',
      category: 'Краски',
      brand: 'Dulux',
      minPrice: 1200,
      maxPrice: 1850,
      suppliers: 10,
      inStock: true,
      rating: 4.6,
    },
    {
      id: 6,
      name: 'Саморезы 3.5×35мм (1000 шт)',
      category: 'Метизы',
      brand: 'Fischer',
      minPrice: 180,
      maxPrice: 290,
      suppliers: 14,
      inStock: true,
      rating: 4.4,
    },
    {
      id: 7,
      name: 'Гипсокартон Knauf 2500×1200×12.5',
      category: 'Доски',
      brand: 'Knauf',
      minPrice: 350,
      maxPrice: 520,
      suppliers: 9,
      inStock: true,
      rating: 4.7,
    },
    {
      id: 8,
      name: 'Дрель-шуруповерт Makita DF330D',
      category: 'Инструменты',
      brand: 'Makita',
      minPrice: 4500,
      maxPrice: 6200,
      suppliers: 7,
      inStock: false,
      rating: 4.5,
    },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.minPrice >= priceRange[0] && product.minPrice <= priceRange[1];
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesStock = !inStockOnly || product.inStock;
    const matchesRating = product.rating >= minRating;
    
    return matchesSearch && matchesPrice && matchesCategory && matchesBrand && matchesStock && matchesRating;
  });

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const resetFilters = () => {
    setPriceRange([0, 15000]);
    setSelectedCategories([]);
    setSelectedBrands([]);
    setInStockOnly(false);
    setMinRating(0);
  };

  const FilterPanel = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-lg">Фильтры</h4>
        <Button variant="ghost" size="sm" onClick={resetFilters}>
          Сбросить
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={['price', 'category', 'brand', 'stock']} className="w-full">
        <AccordionItem value="price">
          <AccordionTrigger className="text-base font-semibold">
            Цена
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={15000}
                step={100}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{priceRange[0]} ₽</span>
                <span className="font-medium">{priceRange[1]} ₽</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="category">
          <AccordionTrigger className="text-base font-semibold">
            Категория
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {categories.map(category => (
                <div key={category.name} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.name}
                    checked={selectedCategories.includes(category.name)}
                    onCheckedChange={() => toggleCategory(category.name)}
                  />
                  <label
                    htmlFor={category.name}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                  >
                    {category.name}
                    <span className="text-muted-foreground ml-1">({category.count})</span>
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brand">
          <AccordionTrigger className="text-base font-semibold">
            Бренд
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {brands.map(brand => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={brand}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => toggleBrand(brand)}
                  />
                  <label
                    htmlFor={brand}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="stock">
          <AccordionTrigger className="text-base font-semibold">
            Наличие
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="inStock"
                  checked={inStockOnly}
                  onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
                />
                <label
                  htmlFor="inStock"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  Только в наличии
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rating">
          <AccordionTrigger className="text-base font-semibold">
            Рейтинг
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {[4.5, 4.0, 3.5, 3.0].map(rating => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={minRating === rating}
                    onCheckedChange={() => setMinRating(minRating === rating ? 0 : rating)}
                  />
                  <label
                    htmlFor={`rating-${rating}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex items-center"
                  >
                    <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500 mr-1" />
                    От {rating}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Building2" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold text-primary">СтройПрайс</h1>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#" className="text-foreground hover:text-primary transition-colors">Главная</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">О нас</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">Услуги</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">Контакты</a>
            </nav>
            <Button variant="outline" className="hidden md:flex">
              <Icon name="User" size={18} className="mr-2" />
              Войти
            </Button>
          </div>
        </div>
      </header>

      <section className="py-20 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Найдите лучшие цены на стройматериалы
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Сравнивайте предложения от сотен поставщиков и экономьте до 40% на каждой покупке
            </p>
            <div className="flex gap-2 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск: цемент, кирпич, доски..."
                  className="pl-10 h-14 text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button size="lg" className="h-14 px-8">
                <Icon name="Search" size={20} className="mr-2" />
                Найти
              </Button>
            </div>
            <div className="flex gap-4 justify-center mt-6 flex-wrap">
              <Badge variant="secondary" className="text-sm py-2 px-4">
                <Icon name="TrendingDown" size={16} className="mr-1" />
                Экономия до 40%
              </Badge>
              <Badge variant="secondary" className="text-sm py-2 px-4">
                <Icon name="Store" size={16} className="mr-1" />
                500+ поставщиков
              </Badge>
              <Badge variant="secondary" className="text-sm py-2 px-4">
                <Icon name="Package" size={16} className="mr-1" />
                10,000+ товаров
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-8 text-center">Популярные категории</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Card
                key={category.name}
                className="hover:shadow-lg transition-all cursor-pointer hover:scale-105 animate-scale-in"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => toggleCategory(category.name)}
              >
                <CardContent className="pt-6 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-3 ${
                    selectedCategories.includes(category.name) ? 'ring-4 ring-primary/30' : ''
                  }`}>
                    <Icon name={category.icon as any} size={32} className="text-white" />
                  </div>
                  <h4 className="font-semibold mb-1">{category.name}</h4>
                  <p className="text-sm text-muted-foreground">{category.count} товаров</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold">Актуальные предложения</h3>
            <div className="flex gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden">
                    <Icon name="SlidersHorizontal" size={18} className="mr-2" />
                    Фильтры
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Фильтры</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterPanel />
                  </div>
                </SheetContent>
              </Sheet>
              <Badge variant="secondary" className="px-3 py-2">
                Найдено: {filteredProducts.length}
              </Badge>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="hidden md:block lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="pt-6">
                  <FilterPanel />
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <Card
                  key={product.id}
                  className="hover:shadow-xl transition-all cursor-pointer group animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardHeader className="pb-3">
                    <div className="aspect-video bg-gradient-to-br from-orange-100 to-blue-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden relative">
                      <Icon name="Package" size={48} className="text-primary/30 group-hover:scale-110 transition-transform" />
                      {!product.inStock && (
                        <Badge variant="destructive" className="absolute top-2 right-2">
                          Нет в наличии
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="w-fit">{product.category}</Badge>
                      <div className="flex items-center gap-1 text-sm">
                        <Icon name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                        <span className="font-medium">{product.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{product.brand}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-primary">
                          {product.minPrice}₽
                        </span>
                        <span className="text-sm text-muted-foreground line-through">
                          {product.maxPrice}₽
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="Store" size={16} />
                        <span>{product.suppliers} поставщиков</span>
                      </div>
                      <Button className="w-full">
                        <Icon name="BarChart3" size={18} className="mr-2" />
                        Сравнить цены
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <Icon name="Zap" size={64} className="mx-auto mb-6 opacity-90" />
          <h3 className="text-4xl font-bold mb-4">Начните экономить прямо сейчас</h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Присоединяйтесь к тысячам строителей, которые уже экономят на материалах
          </p>
          <Button size="lg" variant="secondary" className="h-14 px-8">
            <Icon name="Rocket" size={20} className="mr-2" />
            Зарегистрироваться бесплатно
          </Button>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Building2" size={28} />
                <h4 className="text-xl font-bold">СтройПрайс</h4>
              </div>
              <p className="text-gray-400">
                Находите лучшие цены на строительные материалы от проверенных поставщиков
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Компания</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Вакансии</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Блог</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Помощь</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Поддержка</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Следите за нами</h5>
              <div className="flex gap-3">
                <Button size="icon" variant="ghost" className="hover:bg-white/10">
                  <Icon name="Mail" size={20} />
                </Button>
                <Button size="icon" variant="ghost" className="hover:bg-white/10">
                  <Icon name="Phone" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 СтройПрайс. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
