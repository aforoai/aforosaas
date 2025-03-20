import React, { useState } from 'react';

interface RatePlan {
  ratePlanId: string;
  ratePlanName: string;
  description: string;
  status: string;
  ratePlanType: string;
  startDate: string;
  endDate: string;
  currency: { currencyCode: string };
  product: { productName: string };
}

interface RatePlanFormProps {
  onCancel: () => void;
  onSubmit: (newPlan: RatePlan) => void;
}

const RatePlanForm: React.FC<RatePlanFormProps> = ({ onCancel, onSubmit }) => {
  const [formData, setFormData] = useState<RatePlan>({
    ratePlanId: "",
    ratePlanName: "",
    description: "",
    status: "ACTIVE",
    ratePlanType: "SUBSCRIPTION",
    startDate: "",
    endDate: "",
    currency: { currencyCode: "USD" },
    product: { productName: "" }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === "currencyCode") {
      setFormData(prev => ({ ...prev, currency: { currencyCode: value } }));
    } else if (name === "productName") {
      setFormData(prev => ({ ...prev, product: { productName: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, ratePlanId: String(Date.now()) });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
      <h2 className="text-xl font-bold mb-4">Add Rate Plan</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Rate Plan Name</label>
          <input
            type="text"
            name="ratePlanName"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.ratePlanName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <input
            type="text"
            name="description"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              className="w-full px-3 py-2 border rounded-md"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              name="ratePlanType"
              className="w-full px-3 py-2 border rounded-md"
              value={formData.ratePlanType}
              onChange={handleChange}
            >
              <option value="SUBSCRIPTION">Subscription</option>
              <option value="USAGE_BASED">Usage Based</option>
              <option value="TIERED">Tiered</option>
              <option value="FREEMIUM">Freemium</option>
              <option value="FLAT_RATE">Flat Rate</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              className="w-full px-3 py-2 border rounded-md"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              className="w-full px-3 py-2 border rounded-md"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Currency</label>
            <input
              type="text"
              name="currencyCode"
              className="w-full px-3 py-2 border rounded-md"
              value={formData.currency.currencyCode}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Product Name</label>
            <input
              type="text"
              name="productName"
              className="w-full px-3 py-2 border rounded-md"
              value={formData.product.productName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md"
          >
            Save Rate Plan
          </button>
        </div>
      </form>
    </div>
  );
};

export default RatePlanForm;