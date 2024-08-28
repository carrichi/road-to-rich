import {
  CreditCardIcon,
  HomeIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

const sections = [
  {
    key: 'LODGING',
    icon: HomeIcon,
    items: [
      {
        id: 1,
        name: 'Rent',
        amount: 6200,
        payment_method: 'CASH',
        payment_day: 10,
        icon: HomeIcon,
      },
      {
        id: 2,
        name: 'Maintenance',
        amount: 240,
        payment_method: 'CASH',
        payment_day: 1,
      },
      {
        id: 3,
        name: 'Gas',
        amount: 300,
        payment_method: 'CASH',
        payment_day: 1,
      },
      {
        id: 4,
        name: 'Internet',
        amount: 700,
        payment_method: 'VEX',
        payment_day: 5,
      },
      {
        id: 5,
        name: 'Phone',
        amount: 200,
        payment_method: 'VEX',
        payment_day: 11,
      },
      {
        id: 6,
        name: 'Light',
        amount: 150,
        payment_method: 'DDC',
        payment_day: 4,
      },
      {
        id: 7,
        name: 'Food',
        amount: 500,
        payment_method: 'CASH',
        payment_day: 1,
      },
    ],
  },
  {
    key: 'LIFESTYLE',
    icon: UserCircleIcon,
    items: [
      {
        id: 8,
        name: 'Apple Music',
        amount: 70,
        payment_method: 'MPC',
        payment_day: 30,
      },
      {
        id: 9,
        name: 'Cloud+',
        amount: 50,
        payment_method: 'MPC',
        payment_day: 13,
      },
      {
        id: 10,
        name: 'Youtube',
        amount: 50,
        payment_method: 'CASH',
        payment_day: 5,
      },
      {
        id: 11,
        name: '1password',
        amount: 80,
        payment_method: 'NUC',
        payment_day: 25,
      },
      {
        id: 12,
        name: 'Crunchyroll',
        amount: 120,
        payment_method: 'NUC',
        payment_day: 7,
      },
    ],
  },
  {
    key: 'MSI',
    icon: CreditCardIcon,
    items: [
      {
        id: 13,
        name: 'NUC Loan',
        amount: 570,
        payment_method: 'CASH',
        payment_days: 1,
      },
      {
        id: 14,
        name: 'BBC Loan',
        amount: 920,
        payment_method: 'CASH',
        payment_days: 1,
      },
      {
        id: 15,
        name: 'Water filter',
        amount: 1000,
        payment_method: 'CASH',
        payment_days: 1,
      },
      {
        id: 16,
        name: 'Suitcase',
        amount: 127,
        payment_method: 'MPC',
        payment_day: 13,
      },
      {
        id: 17,
        name: 'Bed Sheets',
        amount: 165,
        payment_method: 'MPC',
        payment_day: 13,
      },
      {
        id: 18,
        name: 'Desk',
        amount: 270,
        payment_method: 'BBC',
        payment_day: 20,
      },
      {
        id: 19,
        name: 'Fridge',
        amount: 3650,
        payment_method: 'CASH',
        payment_day: 20,
      },
      {
        id: 20,
        name: 'Bed',
        amount: 585,
        payment_method: 'CASH',
        payment_day: 20,
      },
      {
        id: 21,
        name: 'Alexa',
        amount: 165,
        payment_method: 'BBC',
        payment_day: 20,
      },
      {
        id: 22,
        name: 'Blue',
        amount: 340,
        payment_method: 'NUC',
        payment_day: 28,
      },
    ],
  },
];
export default function Budget() {
  return (
    <>
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-black sm:truncate sm:text-3xl sm:tracking-tight">
            Budget
          </h2>
        </div>
      </div>
      <div>Totals section</div>
      <div className="overflow-hidden bg-white shadow sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-300">
          {sections.map((section) => (
            <li key={section.key} className="px-4 py-5 sm:px-6 max-w-md">
              <h4 className="text-lg font-bold leading-6 text-black sm:truncate sm:tracking-tight">
                {
                  <section.icon
                    aria-hidden
                    className="h-8 w-8 text-black inline-block pr-2"
                  />
                }
                {section.key}
              </h4>
              <div>
                <ul role="list" className="-mb-8">
                  {section.items.map((item) => (
                    <li key={item.id}>
                      <div className="relative">
                        <span
                          aria-hidden="true"
                          className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                        />
                        <div className="relative flex space-x-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full ring-6 ring-white"></span>
                          <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                            <p className="text-sm text-gray-500 flex items-center">
                              {item.name}
                            </p>
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                              <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                                $
                              </span>
                              <input
                                type="number"
                                step="0.01"
                                value={item.amount}
                                className="inline-block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
