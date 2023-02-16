import CSS from 'csstype';

interface StyleObject {
  aside: string
  asideScrollbars: string
  asideBrand: string
  asideMenuItem: string
  asideMenuItemActive: string
  asideMenuDropdown: string
  navBarItemLabel: string
  navBarItemLabelHover: string
  navBarItemLabelActiveColor: string
  overlay: string
}

export const basic: StyleObject = {
  aside: 'bg-gray-800',
  asideScrollbars: 'aside-scrollbars-gray',
  asideBrand: 'bg-gray-900 text-white',
  asideMenuItem: 'text-gray-500 hover:text-black',
  asideMenuItemActive: 'font-bold text-white',
  asideMenuDropdown: 'bg-gray-700/50',
  navBarItemLabel: 'text-black',
  navBarItemLabelHover: 'hover:text-blue-500',
  navBarItemLabelActiveColor: 'text-blue-600',
  overlay: 'from-gray-700 via-gray-900 to-gray-700',
}

export const white: StyleObject = {
  aside: 'bg-white',
  asideScrollbars: 'aside-scrollbars-light',
  asideBrand: '',
  asideMenuItem: 'text-blue-600 hover:text-black dark:text-white',
  asideMenuItemActive: 'font-bold text-black dark:text-white',
  asideMenuDropdown: 'bg-gray-100/75',
  navBarItemLabel: 'text-blue-600',
  navBarItemLabelHover: 'hover:text-black',
  navBarItemLabelActiveColor: 'text-black',
  overlay: 'from-white via-gray-100 to-white',
}

export const moneyWayText: CSS.Properties = {
  width: '176px',
  height: '45px',

/* Headline Bold - 32 */

  fontFamily: 'Inter',
fontStyle: 'normal',
fontWeight: 700,
fontSize: '32px',
lineHeight: '140%',
display: 'inline',
marginTop: '100px',
marginLeft: '85px',

/* identical to box height, or 45px */

letterSpacing: '0.25px',

/* Indigo 700 */

color: '#3538CD',
  }

  export const textInput: CSS.Properties = {
    padding: '12px 16px',
    gap: '8px',

    width: '383px',
    height: '44px',

    /* White */

    background: '#FFFFFF',
    /* Grey 400 */

    border: '1px solid #98A2B3',
    borderRadius: '6px',
    }

    export const submitButton: CSS.Properties = {
      justifyContent: 'center',
      alignItems: 'center',
      padding: '12px 16px',
      gap: '8px',
      color: '#fff',
      width: '383px',
      height: '44px',

      /* Indigo 700 */

      background: '#3538CD',
      borderRadius: '6px',
      }

     export const moneyWayHeader: CSS.Properties = {
    
        width: '500px',
        height: '24px',
        
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '24px',
        lineHeight: '24px',
        
        color: '#012A4A',
      };

      export const formPText: CSS.Properties = {
    
         height: '20px',

        /* Button Semi Bold - 14 */

        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '20px',
        marginTop: '10px',
      };


      export const formLink: CSS.Properties = {
        color: '#3538CD' ,
        fontWeight: 'bolder',
      }
    
