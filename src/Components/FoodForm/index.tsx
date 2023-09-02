import { useCallback, useEffect } from "react";
import { FOOD_CATEGORY } from "../../utils/constants";
import "./foodFormStyle.scss"
import { Button, DatePicker, Drawer, Form, Input, Select } from 'antd';
import { getDetailFoodId } from "../../API";
import { INewFood } from "../../type";

const { Option } = Select;

interface IFrops {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: INewFood) => void;
    selectedItemId: number | null
}

function FoodForm({ isOpen, onClose, onSubmit, selectedItemId }: IFrops) {
    const [form] = Form.useForm()    

    const onInitInfoUpdateFood = useCallback(() => {
        if(selectedItemId && form) {
            getDetailFoodId(selectedItemId)
            .then(foodData => {
                if(foodData) {
                    form.setFieldsValue(foodData)
                }
            })
        }
    }, [selectedItemId, form])

    useEffect(() => {
        onInitInfoUpdateFood()
    }, [onInitInfoUpdateFood])
    
    return (
        <Drawer
        title={selectedItemId ? "Update food information" : "Create a new food"}
        // width={720}
        width={window.screen.availWidth < 400 ? 320 : 520}
        onClose={onClose}
        open={isOpen}
        closeIcon={null}
        bodyStyle={{ paddingBottom: 80 }}
        >
        <Form layout="vertical" onFinish={onSubmit} form={form}>
            <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please enter food name' }]}
            >
                <Input  
                    size="large"
                    style={{ width: '100%' }}
                />
            </Form.Item>

            <Form.Item
                name="image"
                label="Image"
                rules={[{ required: true, message: 'Please enter food image url' }]}
            >
                <Input
                    style={{ width: '100%' }}
                    size="large"
                    addonBefore="http://"
                />
            </Form.Item>

            <Form.Item
                name="price"
                label="Price"
                rules={[
                    { required: true, message: 'Please enter food price' },
                    { min: 0, message: 'Invalid food price' },
                    {
                        validator(_, value, cb) {
                            if(isNaN(value)) {
                                cb("Invalid food price")
                            } else {
                                cb()
                            }
                        }
                    }
                ]}
            >
                <Input
                    style={{ width: '100%' }}
                    size="large"
                    addonBefore="$"
                    min={0}
                />
            </Form.Item>

            <Form.Item
                name="discount_amount"
                label="Discount amount"
                rules={[
                    { required: true, message: 'Please enter discount amount' },
                    { min: 0, message: 'Invalid amount' },
                    {
                        validator(_, value, cb) {
                            const formPrice = form.getFieldValue("price")
                            if(isNaN(value)) {
                                cb("Invalid amount")
                            } else if(Number(formPrice) <= Number(value)) {
                                cb("Discount amount must be smaller than price")
                            } else {
                                cb()
                            }
                        }
                    }
                ]}
            >
                <Input
                    style={{ width: '100%' }}
                    size="large"
                    // type="number"
                    addonBefore="$"
                    min={0}
                />
            </Form.Item>

            <Form.Item
                name="quantity"
                label="Quantity"
                rules={[
                    { required: true, message: 'Please enter food quantity' },
                    { min: 0, message: 'Invalid amount'}
                ]}
            >
                <Input
                    style={{ width: '100%' }}
                    size="large"
                    type="number"
                    addonAfter="Bowl(s)"
                    min={0}
                />
            </Form.Item>

            <Form.Item
                name="tag"
                label="Tag"
                rules={[
                    { required: true, message: 'Please select a tag' },
                ]}
            >
            <Select size="large" style={{ width: '100%' }}>
                {
                    FOOD_CATEGORY.map(_item =>{
                        return(
                            <Option key={_item} value={_item}>{_item}</Option>
                        )
                    })
                }
            </Select>
            </Form.Item>

            <Form.Item>
                <Button size="large" type="primary" htmlType="submit">Submit</Button>
            </Form.Item>

        </Form>
        </Drawer>
    );
};
    

export default FoodForm;