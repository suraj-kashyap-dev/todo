import { Camera, Mail, Phone, MapPin, Briefcase, Edit2, Save } from 'lucide-react';
import { Input } from '../components/ui/form-controls/Input';
import { Button } from '../components/ui/form-controls/Button';
import { Textarea } from '../components/ui/form-controls/Textarea';

const Profile = () => {
  return (
    <div className="bg-gray-50 py-4">
      <div className="mx-auto sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white shadow">
          <div className="flex items-center justify-between px-4 py-5 sm:px-6">
            <h3 className="text-2xl font-bold text-gray-900">Profile</h3>
            <Button
              variant='primary'
              leftIcon={<Save className="h-4 w-4" />}
            >
              Save
            </Button>
          </div>

          {/* Profile Content */}
          <div className="border-t border-gray-200">
            <div className="px-4 py-5 sm:px-6">
              <div className="flex flex-col gap-6 md:flex-row">
                {/* Avatar Section */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <img
                      src={"https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
                      alt="Profile"
                      className="h-32 w-32 rounded-full object-cover"
                    />
                    <button className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700">
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Profile Details */}
                <div className="flex-1 space-y-6">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="relative flex items-center space-x-2">
                        <Input
                          type="text"
                          name="name"
                        />
                      </div>
                       <div className="relative flex items-center space-x-2">
                        <Input
                          type="text"
                          name="name"
                        />
                      </div>
                      <div className="relative flex items-center">
                        <Mail className="absolute left-4 h-5 w-5 text-gray-400" />
                        <Input
                          type="email"
                          name="email"
                          className="pl-10"
                        />
                      </div>
                      <div className="relative flex items-center">
                        <Phone className="absolute left-4 h-5 w-5 text-gray-400" />

                        <Input
                          type="tel"
                          name="phone"
                          className="pl-10"

                        />
                      </div>

                      <div className="relative flex items-center">
                        <MapPin className="absolute left-4 h-5 w-5 text-gray-400" />

                        <Input
                          type="text"
                          name="location"
                          className="pl-10"

                        />
                      </div>
                      <div className="relative flex items-center">
                        <Briefcase className="absolute left-4 h-5 w-5 text-gray-400" />

                        <Input
                          type="text"
                          name="company"
                          className="pl-10"
                        />
                      </div>
                    </div>

                    {/* Bio */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Bio</label>
                      <Textarea
                        name="bio"
                        rows={4}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;