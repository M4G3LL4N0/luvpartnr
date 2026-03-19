import { useState } from 'react';
import { useNavigate } from 'next/navigation';

export default function Profile() {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const handleProfileChange = async (event) => {
    const { name, value } = event.target;
    setProfileData({ ...profileData, [name]: value });
    setShowProfile(!showProfile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profileData) return;
    try {
      await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });
      navigate('/profile');
    } catch (error) {
      console.error('Profile submission failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Profile</h1>
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {showProfile ? 'Close' : 'Open Profile'}
          </button>
        </div>
        {showProfile && (
          <div className="bg-white/10 p-6 rounded-lg shadow-lg">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Profile Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
