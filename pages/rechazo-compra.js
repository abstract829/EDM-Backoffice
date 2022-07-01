import { useRouter } from 'next/router'

const RechazoCompraPage = () => {
  return (
    <div className=" h-screen bg-[url('../public/imgs/bgdonmelchor.jpg')]">
      <div className="h-full py-12 bg-black font-primary bg-opacity-80">
        <div className="flex flex-col items-center justify-center h-full text-3xl text-center text-white">
          <p>Lo sentimos!</p>
          <p>Tu compra fue rechazada!</p>
        </div>
      </div>
    </div>
  )
}
export default RechazoCompraPage
