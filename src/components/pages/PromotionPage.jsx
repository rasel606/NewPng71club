// import { usePopup } from '../../hooks/usePopup';

// import CategoryTabs from '../common/CategoryTabs';
// import PromoCodeForm from '../common/PromoCodeForm';
// import PromotionGrid from '../promotion/PromotionGrid';

// import MemberMenu from '../common/MemberMenu';
// import FloatBanner from '../common/FloatBanner/FloatBanner';
// import { promotionCategories, promotions } from '../../data/promotions';
// import { useState } from 'react';


// const PromotionPage = () => {
//   const [activeCategory, setActiveCategory] = useState('all');
//   const [promoCode, setPromoCode] = useState('');
//   const [isMemberMenuOpen, setIsMemberMenuOpen] = useState(false);
//   const { isOpen: isDepositOpen, openPopup: openDeposit, closePopup: closeDeposit } = usePopup();

//   const handlePromoCodeSubmit = (code) => {
//     console.log('Promo code submitted:', code);
//     // API call would go here
//   };

//   const handleApplyPromotion = (promotionId) => {
//     console.log('Applying promotion:', promotionId);
//     // API call would go here
//   };

//   const handleDepositSubmit = (depositData) => {
//     console.log('Deposit submitted:', depositData);
//     // API call would go here
//     closeDeposit();
//   };

//   const handleBack = () => {
//     window.history.back();
//   };

//   const userData = {
//     fullName: "Samun",
//     username: "msaikat125623",
//     vipPoints: 2692,
//     mainWallet: 0.25,
//     bonusWallet: 0
//   };

//   return (
//     // <div className="promotion-page">


//       <div className="content-main promotion">
//         <div className="content-box">
//           <div className="promotion">
//             <CategoryTabs
//               categories={promotionCategories}
//               activeCategory={activeCategory}
//               onCategoryChange={setActiveCategory}
//             />

//             <PromoCodeForm
//               promoCode={promoCode}
//               onPromoCodeChange={setPromoCode}
//               onSubmit={handlePromoCodeSubmit}
//             />

//             <PromotionGrid
//               promotions={promotions}
//               onApplyPromotion={handleApplyPromotion}
//             />
//           </div>
//         </div>
//       {/* </div> */}

//       {/* <DepositPopup
//         isOpen={isDepositOpen}
//         onClose={closeDeposit}
//         onSubmit={handleDepositSubmit}
//       />

//       <MemberMenu 
//         isOpen={isMemberMenuOpen}
//         onClose={() => setIsMemberMenuOpen(false)}
//         userData={userData}
//       />

//       <Toolbar 
//         onOpenMemberMenu={() => setIsMemberMenuOpen(true)}
//         onOpenDeposit={openDeposit}
//       /> */}

//       {/* <FloatBanner /> */}
//     </div>
//   );
// };

// export default PromotionPage;



import React from 'react'

export default function PromotionPage() {
  return (
    <div>PromotionPage</div>
  )
}
