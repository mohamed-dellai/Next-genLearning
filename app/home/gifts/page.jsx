"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '../../materialTailwind/tailwindMaterial';
import { Alert, Spinner } from '@material-tailwind/react'; // Import the Spinner component
import { useRouter } from 'next/navigation';

const Gifts = () => {
  const [images, setImages] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success'); // or 'error'
  const [loading, setLoading] = useState(false); // Loading state
  var route=useRouter()
  useEffect(() => {
    
    const fetchImages = async () => {
       
      try {
        const response = await axios.get('/api/home/gifts');
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const handleSelect = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)  // Deselect
        : [...prevSelected, id]  // Select
    );
  };

  const isSelected = (id) => selectedItems.includes(id);

  const handleConfirm = async () => {
    if (selectedItems.length === 0) {
      setAlertMessage('Please select at least one gift.');
      setAlertType('error');
      return;
    }

    setLoading(true); // Set loading to true when starting the request

    try {
      const newImages = images.filter((image) => selectedItems.includes(image.id));

      await axios.post('/api/home/gifts', newImages);
      setAlertMessage('Gifts saved successfully!');
      setAlertType('success');
      route.push("/home/main")
    } catch (error) {
      console.error('Error saving gifts:', error);
      setAlertMessage('Failed to save gifts.');
      setAlertType('error');
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  return (
    <div>
      <div className="relative flex size-full min-h-screen flex-col bg-[#f8fafb] group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
              <div className="flex flex-wrap justify-between gap-3 p-4">
                <div className="flex min-w-72 flex-col gap-3">
                  <p className="text-[#0e161b] tracking-light text-[32px] font-bold leading-tight">
                    Choose gifts for your child
                  </p>
                  <p className="text-[#507a95] text-m font-normal leading-normal">
                    Every 10 points corresponds to a quiz completed.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-8 p-4">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className={`flex flex-col gap-3 p-3 ${isSelected(image.id) ? 'selected-item' : ''}`}
                    onClick={() => handleSelect(image.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div
                      className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                      style={{ backgroundImage: `url(${image.url})` }}
                    />
                    <div>
                      <p className="text-[#0e161b] text-base font-medium leading-normal">
                        {image.points} points
                      </p>
                      <p className="text-[#507a95] text-sm font-normal leading-normal">
                        {image.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex px-4 py-3" style={{ justifyContent: 'center' }}>
                <Button
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 flex-1 bg-[#2c99e2] text-[#f8fafb] text-base font-bold leading-normal tracking-[0.015em]"
                  onClick={handleConfirm}
                  disabled={loading} // Disable the button when loading
                >
                  {loading ? (
                    <Spinner color="white" size="sm" /> // Show spinner when loading
                  ) : (
                    <span className="truncate">Confirm ({selectedItems.length})</span>
                  )}
                </Button>
              </div>
              {alertMessage && (
                <div className="p-4">
                  <Alert
                    color={alertType === 'error' ? 'red' : 'green'}
                    icon={alertType === 'error' ? 'error' : 'check_circle'}
                  >
                    {alertMessage}
                  </Alert>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gifts;