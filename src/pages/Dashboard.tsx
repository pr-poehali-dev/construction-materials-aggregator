import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface Project {
  id: number;
  name: string;
  address: string;
  status: 'planning' | 'in_progress' | 'completed';
  budget: number;
  spent: number;
  startDate: string;
  progress: number;
}

interface Material {
  id: number;
  projectId: number;
  name: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  supplier: string;
  status: 'ordered' | 'delivered' | 'used';
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [isAddMaterialOpen, setIsAddMaterialOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: 'Коттедж на Рублевке',
      address: 'Москва, Рублево-Успенское шоссе, 45',
      status: 'in_progress',
      budget: 5000000,
      spent: 3200000,
      startDate: '2024-01-15',
      progress: 64,
    },
    {
      id: 2,
      name: 'Ремонт офиса ООО "Строй"',
      address: 'Москва, ул. Тверская, 12',
      status: 'planning',
      budget: 1500000,
      spent: 0,
      startDate: '2024-11-20',
      progress: 0,
    },
    {
      id: 3,
      name: 'Баня в Подмосковье',
      address: 'Московская обл., д. Луговая, 7',
      status: 'completed',
      budget: 800000,
      spent: 750000,
      startDate: '2024-06-01',
      progress: 100,
    },
  ]);

  const [materials, setMaterials] = useState<Material[]>([
    {
      id: 1,
      projectId: 1,
      name: 'Цемент М500 50кг',
      quantity: 100,
      unit: 'мешок',
      pricePerUnit: 350,
      supplier: 'СтройБаза №1',
      status: 'delivered',
    },
    {
      id: 2,
      projectId: 1,
      name: 'Кирпич красный',
      quantity: 5000,
      unit: 'шт',
      pricePerUnit: 22,
      supplier: 'Боровичи',
      status: 'used',
    },
    {
      id: 3,
      projectId: 1,
      name: 'Доска обрезная 25×150×6000',
      quantity: 50,
      unit: 'шт',
      pricePerUnit: 900,
      supplier: 'ЛесТорг',
      status: 'ordered',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning':
        return 'bg-blue-500';
      case 'in_progress':
        return 'bg-orange-500';
      case 'completed':
        return 'bg-green-500';
      case 'ordered':
        return 'bg-yellow-500';
      case 'delivered':
        return 'bg-blue-500';
      case 'used':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'planning':
        return 'Планирование';
      case 'in_progress':
        return 'В работе';
      case 'completed':
        return 'Завершен';
      case 'ordered':
        return 'Заказан';
      case 'delivered':
        return 'Доставлен';
      case 'used':
        return 'Использован';
      default:
        return status;
    }
  };

  const activeProjects = projects.filter(p => p.status === 'in_progress');
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = projects.reduce((sum, p) => sum + p.spent, 0);
  const projectMaterials = selectedProject
    ? materials.filter(m => m.projectId === selectedProject)
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                <Icon name="Building2" size={32} className="text-primary" />
                <h1 className="text-2xl font-bold text-primary">СтройПрайс</h1>
              </div>
              <nav className="hidden md:flex gap-4">
                <Button variant="ghost" onClick={() => navigate('/')}>
                  <Icon name="Home" size={18} className="mr-2" />
                  Главная
                </Button>
                <Button variant="ghost" className="bg-primary/10">
                  <Icon name="LayoutDashboard" size={18} className="mr-2" />
                  Мои объекты
                </Button>
              </nav>
            </div>
            <Button variant="outline" onClick={() => navigate('/')}>
              <Icon name="LogOut" size={18} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Личный кабинет</h2>
            <p className="text-muted-foreground">Управляйте своими строительными объектами</p>
          </div>
          <Dialog open={isAddProjectOpen} onOpenChange={setIsAddProjectOpen}>
            <DialogTrigger asChild>
              <Button size="lg">
                <Icon name="Plus" size={20} className="mr-2" />
                Добавить объект
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Новый объект</DialogTitle>
                <DialogDescription>
                  Добавьте информацию о строительном объекте
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Название объекта</Label>
                  <Input id="project-name" placeholder="Коттедж на Рублевке" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-address">Адрес</Label>
                  <Input id="project-address" placeholder="Москва, ул. Примерная, 1" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-budget">Бюджет (₽)</Label>
                  <Input id="project-budget" type="number" placeholder="1000000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-start">Дата начала</Label>
                  <Input id="project-start" type="date" />
                </div>
                <Button type="submit" className="w-full">
                  <Icon name="Check" size={18} className="mr-2" />
                  Создать объект
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Активных объектов
              </CardTitle>
              <Icon name="Briefcase" size={20} className="text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{activeProjects.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Всего объектов: {projects.length}
              </p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Общий бюджет
              </CardTitle>
              <Icon name="DollarSign" size={20} className="text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {(totalBudget / 1000000).toFixed(1)}М ₽
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                По всем объектам
              </p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Потрачено
              </CardTitle>
              <Icon name="TrendingUp" size={20} className="text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {(totalSpent / 1000000).toFixed(1)}М ₽
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {((totalSpent / totalBudget) * 100).toFixed(0)}% от бюджета
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="projects" className="w-full">
          <TabsList>
            <TabsTrigger value="projects">
              <Icon name="Building" size={16} className="mr-2" />
              Объекты
            </TabsTrigger>
            <TabsTrigger value="materials">
              <Icon name="Package" size={16} className="mr-2" />
              Материалы
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <Card
                  key={project.id}
                  className="hover:shadow-lg transition-all cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedProject(project.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge className={getStatusColor(project.status)}>
                        {getStatusText(project.status)}
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <Icon name="MoreVertical" size={18} />
                      </Button>
                    </div>
                    <CardTitle className="text-xl">{project.name}</CardTitle>
                    <CardDescription className="flex items-start gap-1">
                      <Icon name="MapPin" size={14} className="mt-0.5 flex-shrink-0" />
                      {project.address}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Прогресс</span>
                        <span className="font-semibold">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Бюджет:</span>
                        <span className="font-semibold">
                          {(project.budget / 1000000).toFixed(1)}М ₽
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Потрачено:</span>
                        <span className="font-semibold text-orange-600">
                          {(project.spent / 1000000).toFixed(1)}М ₽
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Осталось:</span>
                        <span className="font-semibold text-green-600">
                          {((project.budget - project.spent) / 1000000).toFixed(1)}М ₽
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Calendar" size={14} />
                      Начат: {new Date(project.startDate).toLocaleDateString('ru-RU')}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="materials" className="mt-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label htmlFor="project-select">Объект:</Label>
                <select
                  id="project-select"
                  className="border rounded-md px-3 py-2"
                  value={selectedProject || ''}
                  onChange={(e) => setSelectedProject(Number(e.target.value))}
                >
                  <option value="">Все объекты</option>
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <Dialog open={isAddMaterialOpen} onOpenChange={setIsAddMaterialOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Icon name="Plus" size={18} className="mr-2" />
                    Добавить материал
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Новый материал</DialogTitle>
                    <DialogDescription>
                      Добавьте материал к объекту
                    </DialogDescription>
                  </DialogHeader>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label>Объект</Label>
                      <select className="w-full border rounded-md px-3 py-2">
                        {projects.map(p => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="material-name">Название материала</Label>
                      <Input id="material-name" placeholder="Цемент М500" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="material-quantity">Количество</Label>
                        <Input id="material-quantity" type="number" placeholder="100" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="material-unit">Единица</Label>
                        <Input id="material-unit" placeholder="мешок" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="material-price">Цена за единицу (₽)</Label>
                      <Input id="material-price" type="number" placeholder="350" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="material-supplier">Поставщик</Label>
                      <Input id="material-supplier" placeholder="СтройБаза №1" />
                    </div>
                    <Button type="submit" className="w-full">
                      <Icon name="Check" size={18} className="mr-2" />
                      Добавить материал
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-4 font-semibold">Материал</th>
                        <th className="text-left p-4 font-semibold">Количество</th>
                        <th className="text-left p-4 font-semibold">Цена/ед</th>
                        <th className="text-left p-4 font-semibold">Сумма</th>
                        <th className="text-left p-4 font-semibold">Поставщик</th>
                        <th className="text-left p-4 font-semibold">Статус</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projectMaterials.length > 0 ? (
                        projectMaterials.map((material) => (
                          <tr key={material.id} className="border-t hover:bg-muted/20">
                            <td className="p-4 font-medium">{material.name}</td>
                            <td className="p-4">
                              {material.quantity} {material.unit}
                            </td>
                            <td className="p-4">{material.pricePerUnit} ₽</td>
                            <td className="p-4 font-semibold">
                              {(material.quantity * material.pricePerUnit).toLocaleString()} ₽
                            </td>
                            <td className="p-4 text-muted-foreground">{material.supplier}</td>
                            <td className="p-4">
                              <Badge className={getStatusColor(material.status)}>
                                {getStatusText(material.status)}
                              </Badge>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-muted-foreground">
                            <Icon name="Package" size={48} className="mx-auto mb-2 opacity-50" />
                            <p>Материалы не добавлены</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
