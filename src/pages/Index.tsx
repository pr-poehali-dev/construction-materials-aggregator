import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  suppliers: number;
  image: string;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'Цемент', icon: 'Package', count: 234 },
    { name: 'Кирпич', icon: 'Box', count: 189 },
    { name: 'Доски', icon: 'Layers', count: 156 },
    { name: 'Инструменты', icon: 'Wrench', count: 421 },
    { name: 'Краски', icon: 'Paintbrush', count: 312 },
    { name: 'Метизы', icon: 'Hammer', count: 567 },
  ];

  const products: Product[] = [
    {
      id: 1,
      name: 'Цемент М500 50кг',
      category: 'Цемент',
      minPrice: 320,
      maxPrice: 450,
      suppliers: 12,
      image: '/placeholder.svg',
    },
    {
      id: 2,
      name: 'Кирпич керамический полнотелый',
      category: 'Кирпич',
      minPrice: 18,
      maxPrice: 28,
      suppliers: 8,
      image: '/placeholder.svg',
    },
    {
      id: 3,
      name: 'Доска обрезная 25×150×6000',
      category: 'Доски',
      minPrice: 850,
      maxPrice: 1200,
      suppliers: 15,
      image: '/placeholder.svg',
    },
    {
      id: 4,
      name: 'Перфоратор Makita HR2470',
      category: 'Инструменты',
      minPrice: 8500,
      maxPrice: 12000,
      suppliers: 6,
      image: '/placeholder.svg',
    },
    {
      id: 5,
      name: 'Краска водоэмульсионная 10л',
      category: 'Краски',
      minPrice: 1200,
      maxPrice: 1850,
      suppliers: 10,
      image: '/placeholder.svg',
    },
    {
      id: 6,
      name: 'Саморезы 3.5×35мм (1000 шт)',
      category: 'Метизы',
      minPrice: 180,
      maxPrice: 290,
      suppliers: 14,
      image: '/placeholder.svg',
    },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
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
              >
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-3">
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
            <Button variant="outline">
              <Icon name="SlidersHorizontal" size={18} className="mr-2" />
              Фильтры
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <Card
                key={product.id}
                className="hover:shadow-xl transition-all cursor-pointer group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-3">
                  <div className="aspect-video bg-gradient-to-br from-orange-100 to-blue-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                    <Icon name="Package" size={48} className="text-primary/30 group-hover:scale-110 transition-transform" />
                  </div>
                  <Badge className="w-fit mb-2">{product.category}</Badge>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
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
                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <Icon name="BarChart3" size={18} className="mr-2" />
                        Сравнить цены
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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
