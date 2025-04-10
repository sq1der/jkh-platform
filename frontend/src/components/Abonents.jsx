import { Scroll, Users } from "lucide-react";



const users = [
  { name: "Jesse Thomas", color: "text-yellow-500" },
  { name: "Thisal Mathiyazhagan", color: "text-red-600" },
  { name: "Helen Chuang", color: "text-red-600" },
  { name: "Lura Silverman", color: "text-yellow-500" },
  { name: "Winfred Groton" },
  { name: "Ken Alba" },
  { name: "Alice LeBeau" },
  { name: "Adrian Lu" },
  { name: "Evelyn Hamilton" },
  { name: "Rosa Fiddlebrook" }
];

export default function AbonentyPage() {
  return (
    <div className="flex min-h-screen bg-muted">
      <aside className="w-64 bg-white p-4 shadow-md">
        <h1 className="text-3xl font-bold mb-6">ЖКХ</h1>
        <nav className="space-y-2">
          <div className="flex items-center space-x-2 text-muted-foreground hover:text-black">
            <users className="h-5 w-5" />
            <span className="font-medium">Обзор</span>
          </div>
          <div className="flex items-center space-x-2 font-bold">
            <users className="h-5 w-5 text-blue-500" />
            <span>Абоненты</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground hover:text-black">
            <users className="h-5 w-5" />
            <span className="font-medium">Отчёты</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground hover:text-black">
            <users className="h-5 w-5" />
            <span className="font-medium">Настройки</span>
          </div>
        </nav>

        <div className="absolute bottom-4 left-4">
          <div className="text-sm font-medium">Адиль Хамитов</div>
          <div className="text-muted-foreground text-xs">Администратор</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-semibold mb-6">Абоненты</h2>

        <div className="flex items-center gap-4 mb-6">
          <input placeholder="Поиск..." className="max-w-sm" />
          <button>Найти</button>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <select>
            <select className="w-[200px]">
              <select placeholder="Период: За все время" />
            </select>
            <select>
              <select value="all">За все время</select>
              <select value="month">Последний месяц</select>
            </select>
          </select>

          <select>
            <select className="w-[200px]">
              <select placeholder="Срок задолженности: Все" />
            </select>
            <select>
              <select value="all">Все</select>
              <select value="overdue">С просрочкой</select>
            </select>
          </select>

          <button>Загрузить файл</button>
        </div>
        <Scroll className="border rounded-lg">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100">
              <tr className="text-muted-foreground">
                <th className="p-3">Имя</th>
                <th className="p-3">Адрес</th>
                <th className="p-3">Дата последнего платежа</th>
                <th className="p-3">Сумма</th>
                <th className="p-3">ИИН</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className={("p-3 font-medium", user.color)}>{user.name}</td>
                  <td className="p-3">ул. Иванова 25 квартира 44</td>
                  <td className="p-3">{index % 2 === 0 ? "31 марта 2025" : "25 февраля 2025 года"}</td>
                  <td className="p-3">20.000</td>
                  <td className="p-3">210022345654</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Scroll>
      </main>
    </div>
  );
}