'use client';

interface FiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: { minPrice?: number; maxPrice?: number; location?: string }) => void;
}

export function FiltersModal({ isOpen, onClose, onApply }: FiltersModalProps) {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onApply({
      minPrice: Number(formData.get('minPrice')) || undefined,
      maxPrice: Number(formData.get('maxPrice')) || undefined,
      location: formData.get('location')?.toString() || undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">ফিল্টার প্রপার্টি 🔍</h3>
        
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-300">লোকেশন</label>
            <input
              name="location"
              type="text"
              placeholder="Mirpur, Uttora..."
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm dark:border-gray-700 dark:bg-gray-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-300">সর্বনিম্ন দাম (৳)</label>
              <input
                name="minPrice"
                type="number"
                placeholder="5000"
                className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm dark:border-gray-700 dark:bg-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-300">সর্বোচ্চ দাম (৳)</label>
              <input
                name="maxPrice"
                type="number"
                placeholder="50000"
                className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm dark:border-gray-700 dark:bg-gray-900"
              />
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-lg border border-gray-300 py-2 text-xs font-semibold dark:border-gray-700"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
            >
              ফিল্টার প্রয়োগ করুন
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}