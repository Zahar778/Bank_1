export default function Banck_Button ({text, type, onClick}) {
    const buttonClassName = type === 'transparent' ? 'button-transparent' : 'button';
    return (
            

      <div className='form_display_gap'>
        <div className='flex_form'>
        <div className='logo_form_two'></div>
        <div className='name_replenishment'>Coinbase</div>
        </div>
        <div className='bunk_option_two'></div>
      </div>
    )
}



