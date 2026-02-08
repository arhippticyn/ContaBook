import { useSelector } from "react-redux"
import AddPutContact from "../components/AddPutContact"
import ContactList from "../components/ContactList"
import { selectAddPutPage } from "../redux/selectors"

const Contacts = () => {
  const isAddPage = useSelector(selectAddPutPage)
  return (
    <div>
      {isAddPage ? <AddPutContact /> : <ContactList />}
    </div>
  )
}

export default Contacts