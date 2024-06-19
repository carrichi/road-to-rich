import {
  FaceSmileIcon,
  HandRaisedIcon,
  HandThumbDownIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import PurchaseDetails from './purchases/details';
import { BACKEND_HOST } from '../constants/enviroment';
import Delayed from './misc/delayed';

const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
const formatDateToISO = (timestamp: string) => {
  const months: { [key: number]: string } = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dic',
  };
  const date = new Date(timestamp);
  return (
    date.getDate() + '/' + months[date.getMonth()] + '/' + date.getFullYear()
  );
};
const category_icons = {
  HOME: <HomeIcon />,
  PERSONAL: <FaceSmileIcon />,
  TRAVEL: <TruckIcon />,
  EMERGENCY: <HandRaisedIcon />,
  SKIPPEABLE: <HandThumbDownIcon />,
  OTHER: <QuestionMarkCircleIcon />,
};

export default function PurchasesTable() {
  const [purchases, SetPurchases] = useState<any[]>([]);

  const getPurchases = async () => {
    let res;
    try {
      res = await fetch(`${BACKEND_HOST}/purchases`);
      const purchases = await res.json();
      // console.log(purchases);
      SetPurchases(purchases);
    } catch (error) {
      console.log('Send alert!');
    }
  };

  const [openDetails, SetOpenDetails] = useState(false);
  const [purchaseSelected, SetPurchaseSelected] = useState(null);
  const editHandle = (event: any) => {
    SetPurchaseSelected(event.target.getAttribute('id'));
    SetOpenDetails(true);
  };

  const handleClose = () => {
    SetOpenDetails(false);
    SetPurchaseSelected(null);
  };

  useEffect(() => {
    getPurchases();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Purchases
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all of your purchases in your account including their
            name, amount and status.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add purchase
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Applied At
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Deadline
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {purchases.map((purchase) => (
                  <tr key={purchase.id}>
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="flex items-center">
                        <div className="h-11 w-11 flex-shrink-0">
                          {
                            category_icons[
                              purchase.category ? purchase.category : 'OTHER'
                            ]
                          }
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">
                            {purchase.concept}
                          </div>
                          <div className="mt-1 text-gray-500">
                            {purchase.notes}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <div className="text-gray-900">
                        {USDollar.format(purchase.amount)}
                      </div>
                      <div className="mt-1 text-gray-500">
                        {purchase.payment_method}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        Active
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {purchase.applied_at
                        ? formatDateToISO(purchase.applied_at)
                        : ''}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {purchase.deadline
                        ? formatDateToISO(purchase.deadline)
                        : ''}
                    </td>
                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <button
                        type="button"
                        id={purchase.id}
                        key={purchase.id}
                        onClick={editHandle}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {openDetails && (
              <PurchaseDetails
                state={openDetails}
                callback={handleClose}
                data={purchaseSelected}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
