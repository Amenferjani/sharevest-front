// import { apiService } from '@/services/private-vest/service';
// import { InterestFormData } from '@/types/types';
// import { useState, useEffect } from 'react';


// export const useInterests = () => {
//     const [interests, setInterests] = useState<Interest[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     const fetchInterests = async () => {
//         try {
//             setLoading(true);
//             const response = await apiService.getMyInterests();

//             if (response.success) {
//                 setInterests(response.data);
//                 setError(null);
//             } else {
//                 setError('Failed to fetch interests');
//             }
//         } catch (err) {
//             setError('An error occurred while fetching interests');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const addInterest = async (dealId: string, formData: InterestFormData) => {
//         try {
//             const response = await apiService.addInterest(dealId, formData);

//             if (response.success) {
//                 await fetchInterests(); // Refresh the list
//                 return { success: true, message: response.message };
//             } else {
//                 return { success: false, message: response.message || 'Failed to add interest' };
//             }
//         } catch (err) {
//             return { success: false, message: 'An error occurred while adding interest' };
//         }
//     };

//     const updateInterest = async (interestId: string, formData: InterestFormData) => {
//         try {
//             const response = await apiService.updateInterest(interestId, formData);

//             if (response.success) {
//                 await fetchInterests(); // Refresh the list
//                 return { success: true, message: response.message };
//             } else {
//                 return { success: false, message: response.message || 'Failed to update interest' };
//             }
//         } catch (err) {
//             return { success: false, message: 'An error occurred while updating interest' };
//         }
//     };

//     const removeInterest = async (interestId: string) => {
//         try {
//             const response = await apiService.removeInterest(interestId);

//             if (response.success) {
//                 await fetchInterests(); // Refresh the list
//                 return { success: true, message: response.message };
//             } else {
//                 return { success: false, message: response.message || 'Failed to remove interest' };
//             }
//         } catch (err) {
//             return { success: false, message: 'An error occurred while removing interest' };
//         }
//     };

//     useEffect(() => {
//         fetchInterests();
//     }, []);

//     return {
//         interests,
//         loading,
//         error,
//         addInterest,
//         updateInterest,
//         removeInterest,
//         refetch: fetchInterests
//     };
// };

// export const useDealInterest = (dealId: string) => {
//     const [interest, setInterest] = useState<Interest | null>(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchInterest = async () => {
//             if (!dealId) return;

//             try {
//                 setLoading(true);
//                 const response = await apiService.getInterestForDeal(dealId);

//                 if (response.success) {
//                     setInterest(response.data);
//                 }
//             } catch (err) {
//                 console.error('Error fetching deal interest:', err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchInterest();
//     }, [dealId]);

//     return { interest, loading };
// };