

import { PropagateLoader} from 'react-spinners'

export default function LoadingScreen() {
  return (
    <div className=' bg-gray-200 fixed top-0 bottom-0 start-0 end-0 flex justify-center items-center z-50'>
    <PropagateLoader size={30}  />
    </div>
  )
}
