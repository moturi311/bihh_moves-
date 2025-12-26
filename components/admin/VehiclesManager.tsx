import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Filter } from 'lucide-react';
import { Car } from '../../types';
import { useRealtimeVehicles } from '../../hooks/useRealtimeVehicles';
import ImageUpload from './ImageUpload';

const VehiclesManager: React.FC = () => {
    const { vehicles, loading, error, addVehicle, updateVehicle, deleteVehicle } = useRealtimeVehicles();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState<string>('all');
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState<Car | null>(null);

    const categories = ['all', 'Saloon Car', 'SUV', 'Van', '4x4', 'Compact Car', 'Luxury SUV'];

    const filteredVehicles = (vehicles || []).filter(vehicle => {
        const matchesSearch = (vehicle.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (vehicle.tagline || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'all' || vehicle.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this vehicle?')) {
            const { error } = await deleteVehicle(id);
            if (error) {
                alert('Error deleting vehicle: ' + error);
            }
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif text-[#2C2A26]">Fleet Management</h2>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 bg-[#2C2A26] text-[#F5F2EB] px-4 py-2 rounded-lg hover:bg-black transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add Vehicle
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex gap-4 flex-wrap">
                <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A8A29E]" />
                        <input
                            type="text"
                            placeholder="Search vehicles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-[#F5F2EB] border border-transparent focus:border-[#2C2A26] rounded-lg outline-none"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-[#5D5A53]" />
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="px-4 py-2 bg-[#F5F2EB] border border-transparent focus:border-[#2C2A26] rounded-lg outline-none"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>
                                {cat === 'all' ? 'All Categories' : cat}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Vehicle Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVehicles.map(vehicle => (
                    <div key={vehicle.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-[#D6D1C7] hover:shadow-md transition-shadow">
                        <div className="aspect-video bg-[#F5F2EB] overflow-hidden">
                            <img
                                src={vehicle.imageUrl}
                                alt={vehicle.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-serif text-lg text-[#2C2A26]">{vehicle.name}</h3>
                                    <p className="text-sm text-[#5D5A53]">{vehicle.category}</p>
                                </div>
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Available</span>
                            </div>
                            <p className="text-sm text-[#5D5A53] mb-3">{vehicle.tagline}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold text-[#2C2A26]">
                                    KSh {vehicle.pricePerDay.toLocaleString()}/day
                                </span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setEditingVehicle(vehicle)}
                                        className="p-2 text-[#2C2A26] hover:bg-[#F5F2EB] rounded transition-colors"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(vehicle.id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredVehicles.length === 0 && (
                <div className="text-center py-12 text-[#5D5A53]">
                    <p>No vehicles found matching your criteria.</p>
                </div>
            )}

            {/* Add/Edit Vehicle Modal */}
            {(showAddModal || editingVehicle) && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-[#D6D1C7] flex justify-between items-center">
                            <h3 className="text-xl font-serif text-[#2C2A26]">
                                {editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
                            </h3>
                            <button
                                onClick={() => {
                                    setShowAddModal(false);
                                    setEditingVehicle(null);
                                }}
                                className="text-[#5D5A53] hover:text-[#2C2A26]"
                            >
                                ✕
                            </button>
                        </div>
                        <VehicleForm
                            vehicle={editingVehicle}
                            onSave={async (vehicleData) => {
                                if (editingVehicle) {
                                    const { error } = await updateVehicle(editingVehicle.id, vehicleData);
                                    if (error) {
                                        alert('Error updating vehicle: ' + error);
                                    } else {
                                        setEditingVehicle(null);
                                    }
                                } else {
                                    const { error } = await addVehicle(vehicleData as any);
                                    if (error) {
                                        alert('Error adding vehicle: ' + error);
                                    } else {
                                        setShowAddModal(false);
                                    }
                                }
                            }}
                            onCancel={() => {
                                setShowAddModal(false);
                                setEditingVehicle(null);
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

// Vehicle Form Component
const VehicleForm: React.FC<{
    vehicle: Car | null;
    onSave: (data: Partial<Car>) => void;
    onCancel: () => void;
}> = ({ vehicle, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: vehicle?.name || '',
        tagline: vehicle?.tagline || '',
        description: vehicle?.description || '',
        pricePerDay: vehicle?.pricePerDay || 0,
        category: vehicle?.category || 'SUV' as Car['category'],
        imageUrl: vehicle?.imageUrl || '',
        features: vehicle?.features?.join(', ') || '',
        seats: vehicle?.specs?.seats || 5,
        transmission: vehicle?.specs?.transmission || 'Automatic',
        status: vehicle?.status || 'available' as Car['status'],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            name: formData.name,
            tagline: formData.tagline,
            description: formData.description,
            pricePerDay: Number(formData.pricePerDay),
            category: formData.category,
            imageUrl: formData.imageUrl,
            features: formData.features.split(',').map(f => f.trim()).filter(f => f),
            specs: {
                seats: Number(formData.seats),
                transmission: formData.transmission,
            },
            status: formData.status,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-[#2C2A26] mb-2">Vehicle Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 bg-[#F5F2EB] border border-transparent focus:border-[#2C2A26] rounded-lg outline-none"
                        required
                    />
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-[#2C2A26] mb-2">Tagline</label>
                    <input
                        type="text"
                        value={formData.tagline}
                        onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                        className="w-full px-4 py-2 bg-[#F5F2EB] border border-transparent focus:border-[#2C2A26] rounded-lg outline-none"
                    />
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-[#2C2A26] mb-2">Description</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-2 bg-[#F5F2EB] border border-transparent focus:border-[#2C2A26] rounded-lg outline-none"
                        rows={3}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#2C2A26] mb-2">Price per Day (KSh)</label>
                    <input
                        type="number"
                        value={formData.pricePerDay}
                        onChange={(e) => setFormData({ ...formData, pricePerDay: Number(e.target.value) })}
                        className="w-full px-4 py-2 bg-[#F5F2EB] border border-transparent focus:border-[#2C2A26] rounded-lg outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#2C2A26] mb-2">Category</label>
                    <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as Car['category'] })}
                        className="w-full px-4 py-2 bg-[#F5F2EB] border border-transparent focus:border-[#2C2A26] rounded-lg outline-none"
                    >
                        <option value="Saloon Car">Saloon Car</option>
                        <option value="SUV">SUV</option>
                        <option value="Van">Van</option>
                        <option value="4x4">4x4</option>
                        <option value="Compact Car">Compact Car</option>
                        <option value="Luxury SUV">Luxury SUV</option>
                    </select>
                </div>

                <div className="col-span-2">
                    <ImageUpload
                        currentImageUrl={formData.imageUrl}
                        onImageUploaded={(url) => setFormData({ ...formData, imageUrl: url })}
                        onImageRemoved={() => setFormData({ ...formData, imageUrl: '' })}
                    />
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-[#2C2A26] mb-2">Features (comma-separated)</label>
                    <input
                        type="text"
                        value={formData.features}
                        onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                        className="w-full px-4 py-2 bg-[#F5F2EB] border border-transparent focus:border-[#2C2A26] rounded-lg outline-none"
                        placeholder="4WD, Leather Seats, Climate Control"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#2C2A26] mb-2">Seats</label>
                    <input
                        type="number"
                        value={formData.seats}
                        onChange={(e) => setFormData({ ...formData, seats: Number(e.target.value) })}
                        className="w-full px-4 py-2 bg-[#F5F2EB] border border-transparent focus:border-[#2C2A26] rounded-lg outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#2C2A26] mb-2">Transmission</label>
                    <select
                        value={formData.transmission}
                        onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                        className="w-full px-4 py-2 bg-[#F5F2EB] border border-transparent focus:border-[#2C2A26] rounded-lg outline-none"
                    >
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#2C2A26] mb-2">Status</label>
                    <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as Car['status'] })}
                        className="w-full px-4 py-2 bg-[#F5F2EB] border border-transparent focus:border-[#2C2A26] rounded-lg outline-none"
                    >
                        <option value="available">Available</option>
                        <option value="booked">Booked</option>
                        <option value="maintenance">Maintenance</option>
                    </select>
                </div>
            </div>

            <div className="flex gap-3 pt-4">
                <button
                    type="submit"
                    className="flex-1 bg-[#2C2A26] text-[#F5F2EB] py-2 rounded-lg hover:bg-black transition-colors"
                >
                    {vehicle ? 'Update Vehicle' : 'Add Vehicle'}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 border border-[#D6D1C7] text-[#2C2A26] py-2 rounded-lg hover:bg-[#F5F2EB] transition-colors"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default VehiclesManager;
