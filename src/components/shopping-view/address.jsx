import { useEffect, useState } from "react";
import CommonForm from "../common-view/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress, deleteAddress, editaAddress, fetchAllAddresses } from "@/store/shop/address-slice";
import AddressCard from "./addres-card";
import { useToast } from "@/hooks/use-toast";

const initialAddressFormData = {
    address: '',
    city: '',
    phone: '',
    postalCode: '',
    notes: ''
};

function Address({setCurrentSelectedAddress, selectedId}) {

    const [formData, setFormData] = useState(initialAddressFormData);
    const [curreentEditedId, setCurrentEditedId] = useState(null);
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);
    const {addressList} = useSelector(state => state.shopAddress);
    const {toast} = useToast();

    function handleManageAddress(event) {
        event.preventDefault();

        if(addressList.length >=3 && curreentEditedId === null){
            toast({
                title: "You can't add more than 3 addresses",
                variant: "destructive",
            });
            return
        }

        curreentEditedId !== null ? dispatch(editaAddress({
            userId : user?.id, 
            addressId : curreentEditedId, 
            formData
        })).then(data => {
            if(data?.payload?.success){
                dispatch(fetchAllAddresses(user?.id));
                setFormData(initialAddressFormData);
                setCurrentEditedId(null);
                toast({
                    title: "Address Updated Successfully",
                    variant: "success",
                });
            }
        }):

        dispatch(addNewAddress({
            ...formData,
            userId: user.id
        })).then(data =>{
            if(data?.payload?.success){
                dispatch(fetchAllAddresses(user?.id));
                setFormData(initialAddressFormData);
                toast({
                    title: "Address Added Successfully",
                    variant: "success",
                });
            }
        })
    }

    function handleDeleteAddress (getCurrentAddress) {
        dispatch(deleteAddress({
            userId: user?.id,
            addressId: getCurrentAddress._id
        })).then(data => {
            if(data?.payload?.success){
                dispatch(fetchAllAddresses(user?.id));
                toast({
                    title: "Address Deleted Successfully",
                    variant: "destructive",
                });
            }
        })
    }

    function handleEditAddress(getCurrentAddress) {
        setCurrentEditedId(getCurrentAddress?._id)
        setFormData({
            ...formData,
            address: getCurrentAddress?.address,
            city: getCurrentAddress?.city,
            phone: getCurrentAddress?.phone,
            postalCode: getCurrentAddress?.postalCode,
            notes: getCurrentAddress?.notes
        })
    }

    function isFormValid() {
        return Object.values(formData).every(value => value.trim() !== '');
    }
    

    useEffect(() => {
        dispatch(fetchAllAddresses(user?.id));
      }, [dispatch]);
    
      console.log(addressList, "addressList");


    return (
        <Card >
            <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {
                    addressList && addressList.length > 0 ?
                    addressList.map((singleAddressItem => 
                    <AddressCard 
                        handleDeleteAddress={handleDeleteAddress}
                        addressInfo={singleAddressItem}
                        handleEditAddress={handleEditAddress}
                        setCurrentSelectedAddress={setCurrentSelectedAddress}
                        selectedId={selectedId}
                        /> )) :null
                }

            </div>
            <CardHeader>
                <CardTitle>
                    {
                        curreentEditedId !== null ? "Edit Address" : "Add New Address"
                    }
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {formData && (
                    <CommonForm
                        formControls={addressFormControls}
                        formData={formData}
                        setFormData={setFormData}
                        buttonText={
                            curreentEditedId !== null ? "Edit Address" : "Add Address"
                        }
                        onSubmit={handleManageAddress}
                        isButtonDisabled={!isFormValid()}
                    />
                )}
            </CardContent>
        </Card>
    );
}


export default Address;
