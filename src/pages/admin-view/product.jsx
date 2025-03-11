import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common-view/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from "@/store/admin/product-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { data } from "react-router-dom";


const initialFormData = {
    image : null,
    title : "",
    description : "",
    category : "",
    brand : "",
    price : "",
    salePrice : "",
    totalStock : "",
}

function AdminProduct(){
    const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageURL, setUploadedImageURL] = useState('');
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const [currentEditedId , setCurrentEditedId] = useState(null);


    const { productList } = useSelector(state => state.AdminProducts);
    const dispatch = useDispatch();
    const toast = useToast();


    

    async function onSubmit(event) {
        event.preventDefault();
    
        if (currentEditedId !== null) {
            const data = await dispatch(editProduct({
                id: currentEditedId, formData
            }));
    
            if (data?.payload?.success) {
                dispatch(fetchAllProducts());
                setOpenCreateProductDialog(false);
                setFormData(initialFormData);
                setCurrentEditedId(null);
    
                toast({
                    title: "Product Updated Successfully",
                    description: "Your product has been updated.",
                    variant: "success",
                });
            }
        } else {
            const data = await dispatch(addNewProduct({
                ...formData,
                image: uploadedImageURL
            }));
    
            if (data?.payload?.success) {
                dispatch(fetchAllProducts());
                setOpenCreateProductDialog(false);
                setFormData(initialFormData);
                setImageFile(null);
                setUploadedImageURL('');
    
                toast({
                    title: "Product Added Successfully",
                    description: "Your product has been added.",
                    variant: "success",
                });
            }
        }
    }
    

function isFormValid(){
    return Object.keys(formData)
        .map((key) => formData[key] !== "")
        .every((item)=>item);
}

// delete product function
function handleDelete (getCurrentProductId){

    dispatch(deleteProduct(getCurrentProductId)).then(data=>{
        if(data?.payload?.success){
            dispatch(fetchAllProducts());
        }
    })
}

useEffect(()=>{
    dispatch(fetchAllProducts());
},[dispatch])

console.log(productList,uploadedImageURL ,"productList");
    return(
        <Fragment>
            <div className="mb-5 w-full flex justify-end">
                <Button onClick={() => setOpenCreateProductDialog(true)} color="primary">
                    Add New Product
                </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                {
                    productList && productList.length > 0 
                    ? productList.map((productItem) => (
                        <AdminProductTile
                            setFormData = {setFormData} 
                            setOpenCreateProductDialog ={setOpenCreateProductDialog} 
                            setCurrentEditedId={setCurrentEditedId}  
                            product={productItem}
                            handleDelete = {handleDelete}
                            />
                    ))
                    : null}

            </div>
            <Sheet
                open={openCreateProductDialog}
                onOpenChange={()=>{
                    setOpenCreateProductDialog(false);
                    setCurrentEditedId(null);
                    setFormData(initialFormData);
                }}
                >
                <SheetContent side="right" className="overflow-auto">
                <SheetHeader>
                    <SheetTitle>
                        {
                            currentEditedId !== null?
                            "Edit Product":
                            "Add Product"
                        }
                    </SheetTitle>
                <ProductImageUpload 
                    imageFile={imageFile} 
                    setImageFile={setImageFile} 
                    uploadedImageURL={uploadedImageURL} 
                    setUploadedImageURL={setUploadedImageURL}
                    setImageLoadingState={setImageLoadingState}
                    imageLoadingState={imageLoadingState}
                    currentEditedId = {currentEditedId}
                />

                </SheetHeader>
                <div className="py-6">
                    <CommonForm
                        onSubmit={onSubmit}
                        formData={formData} setFormData={setFormData}
                        buttonText={currentEditedId !== null ? "Edit Product" : "Add Product"}
                        formControls={addProductFormElements}
                        isButtonDisabled={!isFormValid()}
                    />
                </div>
                </SheetContent>
                </Sheet>
        </Fragment>
    )
}

export default AdminProduct;