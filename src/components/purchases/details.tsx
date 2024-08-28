import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { BACKEND_HOST } from '../../constants/enviroment';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function PurchaseDetails(props: {
  state: boolean;
  callback: any;
  data: string | null;
}) {
  const { state, callback, data } = props;
  const [open, setOpen] = useState(state);
  const [purchase, setPurchase] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [concept, setConcept] = useState(undefined);
  const [amount, setAmount] = useState(undefined);
  const [notes, setNotes] = useState(undefined);
  const [status, setStatus] = useState(undefined);
  const [category, setCategory] = useState(undefined);

  const form = {
    concept: {
      value: concept,
      set: setConcept,
      handleChange: (event) => setConcept(event.target.value),
    },
    amount: {
      value: amount,
      set: setAmount,
      handleChange: (event) => setAmount(event.target.value),
    },
    notes: {
      value: notes,
      set: setNotes,
      handleChange: (event) => setAmount(event.target.value),
    },
    status: {
      value: status,
      set: setStatus,
      handleChange: (event) => setAmount(event.target.value),
    },
    category: {
      value: category,
      set: setCategory,
      handleChange: (event) => setAmount(event.target.value),
    },
  };

  const getPurchaseDetails = async (id: string) => {
    let res;
    try {
      res = await fetch(`${BACKEND_HOST}/purchases/${id}`);
      const purchase = await res.json();
      setPurchase(purchase);
      setLoading(false);
    } catch (error) {
      console.log('Send alert!');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (data != null) getPurchaseDetails(data);
    }, 3000);
  }, [data]);

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        callback();
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (purchase != null) {
      form.concept.set(purchase.concept);
      form.amount.set(purchase.amount);
      form.notes.set(purchase.notes);
      form.status.set(purchase.status);
      form.category.set(purchase.category);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchase]);

  return (
    <Transition show={open}>
      <Dialog className="relative z-10" onClose={setOpen}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16 pt-16 ">
              <TransitionChild
                enter="transform transition delay-1000 ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-md">
                  <form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                    <div className="h-0 flex-1 overflow-y-auto">
                      <div className="bg-indigo-700 px-4 py-6 sm:px-6">
                        <div className="flex items-center justify-between">
                          <DialogTitle className="text-base font-semibold leading-6 text-white">
                            Purchase Details
                          </DialogTitle>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                              onClick={() => setOpen(false)}
                            >
                              <span className="absolute -inset-2.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="divide-y divide-gray-200 px-4 sm:px-6">
                          <div className="space-y-6 pb-5 pt-6">
                            <div>
                              <label
                                htmlFor="concept"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Concept
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  name="concept"
                                  id="concept"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  value={form.concept.value}
                                  onChange={form.concept.handleChange}
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="amount"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Amount
                              </label>
                              <div className="mt-2">
                                <input
                                  type="number"
                                  step="0.01"
                                  name="amount"
                                  id="amount"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  value={form.amount.value}
                                  onChange={form.amount.handleChange}
                                />
                              </div>
                            </div>
                            <div className="flex gap-x-4">
                              <div>
                                <label
                                  htmlFor="status"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Status
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    step="0.01"
                                    name="status"
                                    id="status"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={form.status.value}
                                    onChange={form.status.handleChange}
                                  />
                                </div>
                              </div>
                              <div>
                                <label
                                  htmlFor="category"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Category
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    step="0.01"
                                    name="category"
                                    id="category"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={form.category.value}
                                    onChange={form.category.handleChange}
                                  />
                                </div>
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="description"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Description
                              </label>
                              <div className="mt-2">
                                <textarea
                                  id="description"
                                  name="description"
                                  rows={4}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  value={form.notes.value}
                                  onChange={form.notes.handleChange}
                                />
                              </div>
                            </div>
                          </div>
                          {/* <div className="pb-6 pt-4">
                            <div className="flex text-sm">
                              <a
                                href="#"
                                className="group inline-flex items-center font-medium text-indigo-600 hover:text-indigo-900"
                              >
                                <LinkIcon
                                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-900"
                                  aria-hidden="true"
                                />
                                <span className="ml-2">Copy link</span>
                              </a>
                            </div>
                            <div className="mt-4 flex text-sm">
                              <a
                                href="#"
                                className="group inline-flex items-center text-gray-500 hover:text-gray-900"
                              >
                                <QuestionMarkCircleIcon
                                  className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                                <span className="ml-2">
                                  Learn more about sharing
                                </span>
                              </a>
                            </div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 justify-end px-4 py-4">
                      <button
                        type="button"
                        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
