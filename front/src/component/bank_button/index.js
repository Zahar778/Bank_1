export default function Banck_Button ({text, type, onClick}) {
    const buttonClassName = type === 'transparent' ? 'button-transparent' : 'button';
    return (
            

      <div className='form_display_gap'>
        <div className='flex_form'>
        <div className='logo_form'></div>
        <div className='name_replenishment'>Stripe</div>
        </div>
        <div className='bunk_option'></div>
      </div>
    )
}



