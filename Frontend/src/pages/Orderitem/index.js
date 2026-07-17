import './index.css'

const Orderitem = props => {
    const {orderDetails,cancelOrder} = props;
    const {_id,items,status,totalPrice,createdAt,} = orderDetails;
  const   CancelOrders = id =>{
        cancelOrder(id);
    }
    return(
        <div className="orderitem">
            <div className="orderitem-body">
              <ul className="items-list">
    {items
        .filter(each => each.product !== null)
        .map(each => (
            <li className="item" key={each._id}>
                <img
                    className="item-image"
                    src={each.product.imageUrl}
                    alt={each.product.name}
                />

                <p className="item-name">{each.product.name}</p>

                <p className="item-qty">
                    Quantity: {each.quantity}
                </p>

                <p className="item-price">
                    Price: ₹{each.product.price}
                </p>
            </li>
        ))}
</ul>

                <div className="order-meta">
                    <p className="order-total">Total: {totalPrice}</p>
                    <p className={`order-status ${status.toLowerCase()}`}>{status}</p>
                    <p className="order-date">{new Date(createdAt).toLocaleString()}</p>
                    {/* <p className="order-id">{_id}</p> */}
                </div>
            </div>

            {status === 'Pending' && <button className="cancel-btn" onClick={() => CancelOrders(_id)}> Cancel Order</button>}
        </div>
    )
}
export default Orderitem