import React, { useState } from 'react';
import { Calendar, Clock, DollarSign, AlertCircle, Check, X, Plus, Edit, Trash2 } from 'lucide-react';
import RatePlanForm from './RatePlanForm';

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

const RatePlansDashboard = () => {
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState<RatePlan | null>(null);

  const [ratePlans, setRatePlans] = useState<RatePlan[]>([
    {
      ratePlanId: "1",
      ratePlanName: "Pay-as-You-Go",
      description: "Charges customers based on actual usage, often per API call, per GB of storage, or per transaction.",
      status: "ACTIVE",
      ratePlanType: "USAGE_BASED",
      startDate: "2024-01-01",
      endDate: "2025-01-01",
      currency: { currencyCode: "USD" },
      product: { productName: "AWS" }
    },
    {
      ratePlanId: "2",
      ratePlanName: "Free Starter Plan",
      description: "Good for beginners",
      status: "INACTIVE",
      ratePlanType: "FREEMIUM",
      startDate: "2024-02-01",
      endDate: "2025-02-01",
      currency: { currencyCode: "INR" },
      product: { productName: "Spotify" }
    },
    {
      ratePlanId: "3",
      ratePlanName: "Simply Monthly Plan",
      description: "A fixed price per month or year, giving users full access to the product's services. No usage-based variations.",
      status: "INACTIVE",
      ratePlanType: "FLAT_RATE",
      startDate: "2024-02-01",
      endDate: "2025-02-01",
      currency: { currencyCode: "INR" },
      product: { productName: "NETFLIX" }
    },
    {
      ratePlanId: "4",
      ratePlanName: "Business Growth Plan",
      description: "Pricing varies by usage tiers. Users pay a different rate as they move into higher consumption brackets.",
      status: "INACTIVE",
      ratePlanType: "TIERED",
      startDate: "2024-02-01",
      endDate: "2025-02-01",
      currency: { currencyCode: "INR" },
      product: { productName: "Twilio" }
    },
    {
      ratePlanId: "5",
      ratePlanName: "Pro Membership",
      description: " Recurring billing model where users pay periodically (monthly/yearly) for continued access to features.",
      status: "INACTIVE",
      ratePlanType: "SUBSCRIPTION",
      startDate: "2024-02-01",
      endDate: "2025-02-01",
      currency: { currencyCode: "INR" },
      product: { productName: "Adobe Creative Cloud " }
    }
  ]);

  const filteredRatePlans = ratePlans.filter(plan => {
    const matchesStatus = statusFilter === "ALL" || plan.status === statusFilter;
    const matchesType = typeFilter === "ALL" || plan.ratePlanType === typeFilter;
    const matchesSearch = plan.ratePlanName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          plan.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesType && matchesSearch;
  });

  const handleAddRatePlan = (newPlan: RatePlan) => {
    setRatePlans([...ratePlans, newPlan]);
    setShowForm(false);
    setEditingPlan(null);
  };

  const handleEditRatePlan = (updatedPlan: RatePlan) => {
    setRatePlans(ratePlans.map(plan => 
      plan.ratePlanId === updatedPlan.ratePlanId ? updatedPlan : plan
    ));
    setShowForm(false);
    setEditingPlan(null);
  };

  const handleDeleteRatePlan = (planId: string) => {
    if (window.confirm("Are you sure you want to delete this rate plan?")) {
      setRatePlans(ratePlans.filter(plan => plan.ratePlanId !== planId));
    }
  };

  const openEditForm = (plan: RatePlan) => {
    setEditingPlan(plan);
    setShowForm(true);
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case "SUBSCRIPTION": return "bg-blue-100 text-blue-800";
      case "USAGE_BASED": return "bg-purple-100 text-purple-800";
      case "TIERED": return "bg-green-100 text-green-800";
      case "FREEMIUM": return "bg-yellow-100 text-yellow-800";
      case "FLAT_RATE": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <RatePlanForm 
            onSubmit={editingPlan ? handleEditRatePlan : handleAddRatePlan}
            onCancel={() => {
              setShowForm(false);
              setEditingPlan(null);
            }}
            // initialData={editingPlan || undefined}
          />
        </div>
      )}
      
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Rate Plans</h1>
            <p className="text-gray-600 mt-2">Manage your product pricing strategies</p>
          </div>
          <button
            onClick={() => {
              setEditingPlan(null);
              setShowForm(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Rate Plan
          </button>
        </header>

        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Search rate plans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                className="px-3 py-2 border border-gray-300 rounded-md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="ALL">All Statuses</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                className="px-3 py-2 border border-gray-300 rounded-md"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="ALL">All Types</option>
                <option value="SUBSCRIPTION">Subscription</option>
                <option value="USAGE_BASED">Usage Based</option>
                <option value="TIERED">Tiered</option>
                <option value="FREEMIUM">Freemium</option>
                <option value="FLAT_RATE">Flat Rate</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRatePlans.map((plan) => (
            <div key={plan.ratePlanId} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{plan.ratePlanName}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${plan.status === "ACTIVE" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {plan.status}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                <div className="flex items-center mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(plan.ratePlanType)}`}>
                    {plan.ratePlanType.replace("_", " ")}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{plan.startDate} to {plan.endDate}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <DollarSign className="h-4 w-4 mr-1" />
                  <span>{plan.currency.currencyCode}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span>{plan.product.productName}</span>
                </div>
                
                {/* Edit and Delete buttons */}
                <div className="flex gap-2 mt-2 pt-3 border-t border-gray-100">
                  <button 
                    onClick={() => openEditForm(plan)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-3 rounded-md text-sm flex items-center justify-center gap-1 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteRatePlan(plan.ratePlanId)}
                    className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 px-3 rounded-md text-sm flex items-center justify-center gap-1 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRatePlans.length === 0 && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">No rate plans found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RatePlansDashboard;