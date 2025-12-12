import React from 'react';
import { NavLink, useSearchParams } from 'react-router';

const PaymentSuccess = () => {

  const [searchParams]= useSearchParams();
  const session_id = searchParams.get('session_id');


      const saveMembership = async () => {
      const res = await fetch("http://localhost:3000/save-membership", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ session_id }),
      });

      const data = await res.json();
      console.log("Membership saved:", data);
    };

    if (session_id) saveMembership();

  return (
    <div style={{
      height: '100%',
      width:'50%',
      margin:'0px auto',
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      fontFamily:'Inter',
      color:'var(--bg-primary)',
            textAlign:'center'
    }}>
      <h3 style={{
        fontSize:'40px',
        fontFamily:'bebas neue'
      }}>Your payment has been received</h3>
      <p>You've successfully joined the club! Your membership is now active, and you can fully participate in all club activities and discussions. Connect with other members, explore available resources, and make the most of your membership. We're excited to welcome you to the community!</p>
    </div>
  );
};

export default PaymentSuccess;