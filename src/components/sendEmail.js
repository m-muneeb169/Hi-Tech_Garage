// // import emailjs from 'emailjs-com';
// // import { db } from '../firebase';
// // import { doc, getDoc, collection } from 'firebase/firestore';

// // export const sendBookingConfirmationEmail = async (workshopId, orderId) => {
// //   try {
// //     // 1. Get workshop data
// //     const workshopRef = doc(db, 'workshops', workshopId);
// //     const workshopSnap = await getDoc(workshopRef);

// //     if (!workshopSnap.exists()) throw new Error('Workshop not found');
// //     const workshopData = workshopSnap.data();
// //     const orders = workshopData.orders || [];

// //     // 2. Find the specific order
// //     const order = orders.find((order) => order.orderId === orderId);
// //     if (!order) throw new Error('Order not found');

// //     // 3. Get the userId from the order
// //     const userId = order.userId;
// //     if (!userId) throw new Error('User ID not found in order');

// //     // 4. Fetch user document from users collection
// //     const userRef = doc(db, 'users', userId);
// //     const userSnap = await getDoc(userRef);

// //     if (!userSnap.exists()) throw new Error('User not found');
// //     const userData = userSnap.data();
// //     const userEmail = userData.email;
// //     if (!userEmail) throw new Error('Email not found in user document');

// //     // 5. Prepare service and price data
// //     const servicesArray = order.userselectedservices || [];
// //     const services = servicesArray.map((s) => s.name).join(', ');
// //     const totalPrice = servicesArray.reduce((sum, s) => sum + Number(s.price || 0), 0);

// //     // 6. Prepare email template parameters
// //     const templateParams = {
// //       to_email: userEmail, // ✅ Now from users collection
// //       user_name: order.userFullName || '',
// //       workshop: workshopData.fullName || '',
// //       workshop_address: workshopData.address || '',
// //       date: order.usertimeselected?.date || order.selectedDate || '',
// //       time: order.usertimeselected?.time || order.selectedTime || '',
// //       services: services,
// //       total_price: totalPrice,
// //       phone: workshopData.mobileNo || '',
// //       email: workshopData.email || '', // optional
// //       current_year: new Date().getFullYear(),
// //     };

// //     console.log('📧 Sending email with params:', templateParams);

// //     // 7. Send the email
// //     const result = await emailjs.send(
// //       'service_lvhzizv',        // Your EmailJS Service ID
// //       'template_nk0y1we',       // Your EmailJS Template ID
// //       templateParams,
// //       '-xrTiVXJCj69wwFvN'       // Your EmailJS Public Key
// //     );

// //     console.log('✅ Email sent:', result.text);
// //   } catch (error) {
// //     console.error('❌ Email sending failed:', error);
// //   }
// // };


// import emailjs from 'emailjs-com';
// import { db } from '../firebase';
// import { doc, getDoc } from 'firebase/firestore';

// export const sendBookingConfirmationEmail = async (workshopId, orderId) => {
//   try {
//     // Step 1: Fetch workshop document
//     const workshopRef = doc(db, 'workshops', workshopId);
//     const workshopSnap = await getDoc(workshopRef);
//     if (!workshopSnap.exists()) throw new Error('Workshop not found');
//     const workshopData = workshopSnap.data();
//     const orders = workshopData.orders || [];

//     // Step 2: Find the specific order
//     const order = orders.find((o) => o.orderId === orderId);
//     if (!order) throw new Error('Order not found in workshop');

//     // Step 3: Extract userId and fetch user data from users collection
//     const userId = order.userId;
//     if (!userId) throw new Error('User ID not found in order');

//     const userRef = doc(db, 'users', userId);
//     const userSnap = await getDoc(userRef);
//     if (!userSnap.exists()) throw new Error('User not found');
//     const userData = userSnap.data();
//     const userEmail = userData.email;
//     if (!userEmail) throw new Error('User email not found');

//     // Step 4: Extract services and calculate total price
//     const servicesArray = order.userselectedservices || [];
//     const services = servicesArray.map((s) => s.name).join(', ');
//     const totalPrice = servicesArray.reduce((sum, s) => sum + Number(s.price || 0), 0);

//     // Step 5: Prepare template parameters
//     const templateParams = {
//       to_email: userEmail,
//       user_name: order.userFullName || '',
//       workshop: workshopData.fullName || '',
//       workshop_address: workshopData.address || '',
//       date: order.usertimeselected?.date || order.selectedDate || '',
//       time: order.usertimeselected?.time || order.selectedTime || '',
//       services: services,
//       total_price: totalPrice,
//       phone: workshopData.mobileNo || '',
//       email: workshopData.email || '',
//       current_year: new Date().getFullYear(),
//     };

//     console.log('📧 Sending email to user:', templateParams.to_email);

//     // Step 6: Send the email
//     const result = await emailjs.send(
//       'service_lvhzizv',       // ✅ Your EmailJS service ID
//       'template_nk0y1we',      // ✅ Your EmailJS template ID
//       templateParams,
//       '-xrTiVXJCj69wwFvN'      // ✅ Your EmailJS public key
//     );

//     console.log('✅ Email sent successfully:', result.text);
//   } catch (error) {
//     console.error('❌ Email sending failed:', error.message);
//   }
// };

// sendEmail.js
import emailjs from 'emailjs-com';
import { db, auth } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

// ✅ Main function for logged-in users
export const sendBookingConfirmationEmail = async (workshopId, orderId) => {
  try {
    console.log('📩 Starting email process (logged-in user)...');

    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error('No user is currently logged in');

    return await sendBookingConfirmationEmailByUserId(workshopId, orderId, currentUser.uid);

  } catch (error) {
    console.error('❌ Email sending failed (logged-in):', error);
    return {
      success: false,
      message: `Failed: ${error.message}`,
      error: error.message,
    };
  }
};

// ✅ Alternative function using userId explicitly
export const sendBookingConfirmationEmailByUserId = async (workshopId, orderId, userId) => {
  try {
    console.log('📩 Sending email using userId:', userId);

    // Fetch user data
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) throw new Error('User not found in users collection');

    const userData = userSnap.data();
    const userEmail = userData.email;
    if (!userEmail) throw new Error('User email not found');

    // Fetch workshop data
    const workshopRef = doc(db, 'workshops', workshopId);
    const workshopSnap = await getDoc(workshopRef);
    if (!workshopSnap.exists()) throw new Error('Workshop not found');

    const workshopData = workshopSnap.data();
    const orders = workshopData.orders || [];
    const order = orders.find((o) => o.orderId === orderId);
    if (!order) throw new Error('Order not found in workshop');

    // Services
    const servicesArray = order.userselectedservices || [];
    const services = servicesArray.map((s) => `${s.name} - Rs. ${s.price}`).join(', ');
    const totalPrice = servicesArray.reduce((sum, s) => sum + Number(s.price || 0), 0);

    // Date and time
    const appointmentDate = order.usertimeselected?.date || '';
    const appointmentTime = order.usertimeselected?.time || '';

    // EmailJS template parameters
    const templateParams = {
      to_email: userEmail,
      user_name: order.userFullName || userData.fullName || 'Valued Customer',
      workshop: workshopData.fullName || 'Hi-Tech Garage',
      workshop_address: workshopData.address || 'Not Provided',
      date: appointmentDate,
      time: appointmentTime,
      services: services || 'No services selected',
      total_price: totalPrice.toFixed(2),
      user_address: order.orderAddress || userData.address || 'Not Provided',
      user_phone: order.orderPhoneNumber || userData.contactNo || 'Not Provided',
      order_id: order.orderId || '',
      current_year: new Date().getFullYear(),
    };

    console.log('📧 Sending email with:', templateParams);

    const result = await emailjs.send(
      'service_lvhzizv',     // ✅ Your EmailJS service ID
      'template_nk0y1we',    // ✅ Your EmailJS template ID
      templateParams,
      '-xrTiVXJCj69wwFvN'    // ✅ Your EmailJS public key
    );

    console.log('✅ Email sent to:', userEmail, '| Response:', result.status, result.text);
    return {
      success: true,
      message: 'Email sent successfully',
      emailSentTo: userEmail,
    };

  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
    return {
      success: false,
      message: `Failed: ${error.message}`,
      error: error.message,
    };
  }
};
