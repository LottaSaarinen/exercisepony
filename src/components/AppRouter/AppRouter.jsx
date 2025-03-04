import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AddItem from '../AddItem'
import Calendar from '../Calendar'
import Competition from '../Competition'
import EditItem from '../EditItem'
import ErrorPage from '../ErrorPage'
import Feeding from '../Feeding'
import Items from '../Items'
import Photos from '../Photos'
import Root from '../Root'
import Stats from '../Stats'
import Shoe from '../Shoe'
import Vet from '../Vet'

function AppRouter(props) {
  
  const router = createBrowserRouter([
    {
      path: "/",  // Päänavigointireitti
      element: <Root />,  // Komponentti, joka renderöidään pääreitin kohdalla
      errorElement: <ErrorPage />,  // Jos reitissä tapahtuu virhe, näytetään virhesivu
      children: [
        {
          path: "",  
          element: <Calendar typelist={props.typelist} onTypeSubmit={props.onTypeSubmit} user={props.user} auth={props.auth} />, 
        },
        {
          path: "items",  // Tyhjä polku (eli juuripolku)
          element: <Items />,  // Renderöi Items-komponentin
          loader: () => { 
            // Lataa dataa propsista Items-komponentille
            return props.data 
          }
        },
        {
          path: "add",  // "add"-polku lisäämistä varten
          element: <AddItem onItemSubmit={props.onItemSubmit} typelist={props.typelist}user={props.user} auth={props.auth} />, 
        },
        {
          path: "edit/:id",  // "edit/:id" polku, joka on dynaaminen ja ottaa vastaan itemin ID:n
          element: <EditItem onItemSubmit={props.onItemSubmit} onItemDelete={props.onItemDelete} typelist={props.typelist} />,  // Komponentti, joka hoitaa itemin muokkaamisen ja poistamisen
          loader: ({params}) => {
            // Lataa tietyn itemin, jonka ID saadaan polun parametreista
            const item = props.data.filter(item => item.id === params.id).shift()
            if (item) {
              // Palautetaan item, jos se löytyy
              return { item }
            } else {
              // Jos itemiä ei löydy, heitetään 404-virhe
              throw new Response("Not Found", { status: 404 })
            }
          }
        },
        {
          path: "competition",  
          element: <Competition typelist={props.typelist} onTypeSubmit={props.onTypeSubmit}  />, 
        },
        
        {
          path: "feeding",  
          element: <Feeding typelist={props.typelist} onTypeSubmit={props.onTypeSubmit}  />, 
        }
        ,
        {
          path: "photos", 
          element: <Photos typelist={props.typelist} onTypeSubmit={props.onTypeSubmit}  />,
        },
        {
          path: "shoe",  
          element: <Shoe typelist={props.typelist} onTypeSubmit={props.onTypeSubmit} />, 
        }
        ,
        {
          path: "stats",  
          element: <Stats data={props.data} />,  
        
        },
      
      
        {
          path: "vet", 
          element: <Vet typelist={props.typelist} onTypeSubmit={props.onTypeSubmit}  />,  
        }
       

        
      ]
    }
  ])

  return (
   
    <RouterProvider router={router} />
  )
}

export default AppRouter;