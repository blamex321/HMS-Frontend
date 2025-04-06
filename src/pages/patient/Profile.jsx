import { useEffect, useState } from 'react';
import api from '../../services/api';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    medicalHistory: {
      allergies: '',
      chronicConditions: '',
      medications: '',
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/patient/me').then((res) => {
      const { name, email, medicalHistory = {} } = res.data;
      setProfile({
        name,
        email,
        medicalHistory: {
          allergies: medicalHistory.allergies || '',
          chronicConditions: medicalHistory.chronicConditions || '',
          medications: medicalHistory.medications || '',
        },
      });
      setLoading(false);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['allergies', 'chronicConditions', 'medications'].includes(name)) {
      setProfile({
        ...profile,
        medicalHistory: {
          ...profile.medicalHistory,
          [name]: value,
        },
      });
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put('/patient/me', profile);
    alert('Profile updated!');
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="bg-white p-6 rounded shadow max-w-xl">
      <h2 className="text-xl font-bold mb-4">My Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={profile.name} onChange={handleChange} className="input-style" />
        <input name="email" value={profile.email} onChange={handleChange} className="input-style" />

        <h3 className="font-semibold mt-4">Medical History</h3>
        <input
          name="allergies"
          value={profile.medicalHistory.allergies}
          onChange={handleChange}
          className="input-style"
          placeholder="Allergies"
        />
        <input
          name="chronicConditions"
          value={profile.medicalHistory.chronicConditions}
          onChange={handleChange}
          className="input-style"
          placeholder="Chronic Conditions"
        />
        <input
          name="medications"
          value={profile.medicalHistory.medications}
          onChange={handleChange}
          className="input-style"
          placeholder="Medications"
        />

        <button type="submit" className="btn-primary">Update</button>
      </form>
    </div>
  );
};

export default Profile;
