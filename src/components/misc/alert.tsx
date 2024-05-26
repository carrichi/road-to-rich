import { XCircleIcon } from '@heroicons/react/20/solid';

export default function Alert(
  mode: 'warning' | 'error' | 'success',
  options: { title: string; text: string; dissmisButton?: boolean },
) {
  const colors = {
    warning: 'yellow',
    error: 'red',
    success: 'green',
  };
  const color = colors[mode];
  return (
    <div className={`border-l-4 border-${color}-400 bg-yellow-50 p-4`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon
            className={`h-5 w-5 text-${color}-400`}
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p className={`text-sm text-${color}-700`}>
            {options.title}{' '}
            <a
              href="#"
              className={`font-medium text-${color}-700 underline hover:text-${color}-600`}
            >
              Upgrade your account to add more credits.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
