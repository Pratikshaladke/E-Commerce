import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import { updateOrder } from '../services/auth.services'

function Success() {
    const { id } = useParams()

    console.log(id)

    useEffect(() => {
        const test = async (id) => {
            const response = await updateOrder(id);
        }
        test(id);
    }, [])

    return (
        <div className="align-self-center">
            <br />
            <img src="https://shots.codepen.io/warrendunlop/pen/YmVKzm-800.jpg?version=1564501659"
                style={{ width: '200px', height: '200px' }}
                alt=""
            />
            <h1>Payment Success</h1>
        </div>
    )
}

export default Success;