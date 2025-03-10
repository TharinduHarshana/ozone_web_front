import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({ addressInfo, handleDeleteAddress, handleEditAddress, setCurrentSelectedAddress, selectedId }) {
  console.log(selectedId, addressInfo?._id);

  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer border-red-700 ${
        selectedId?._id === addressInfo?._id
          ? "border-red-900 border-[4px]"
          : "border-black"
      }`}
    >

      <CardContent className={`${selectedId === addressInfo?._id ? 'border-black':''}grid gap-4 p-4`}>
        <Label> Address: {addressInfo?.address} </Label>
        <Label> City: {addressInfo?.city} </Label>
        <Label> Postal Code: {addressInfo?.postalCode} </Label>
        <Label> Phone Number: {addressInfo?.phone} </Label>
        <Label> Notes: {addressInfo?.notes} </Label>
      </CardContent>
      <CardFooter className="p-3 flex justify-between gap-2">
        <Button onClick={()=> handleEditAddress(addressInfo)}> Edit Address </Button>
        <Button onClick={()=> handleDeleteAddress(addressInfo)}> Delete Address </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;