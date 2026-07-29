import './index.css'

const AddressCard = props => {
    const { address, onEdit, onDelete, onMakeDefault } = props
    
    const {
        _id,
        fullName,
        phone,
        house,
        area,
        city,
        state,
        pincode,
        landmark,
        isDefault
    } = address

    return (
        <div className={`address-card ${isDefault ? 'is-default' : ''}`}>
            <div className="card-header">
                <div className="user-info">
                    <h3>{fullName}</h3>
                    <span className="phone">{phone}</span>
                </div>
                {isDefault && <span className="badge">Default</span>}
            </div>

            <div className="card-body">
                <p>{house}, {area}</p>
                <p>{city}, {state} - <strong>{pincode}</strong></p>
                {landmark && <p className="landmark">Landmark: {landmark}</p>}
            </div>

            <div className="card-actions">
                <div className="action-group-primary">
                    {!isDefault && (
                        <button 
                            type="button" 
                            className="btn-default" 
                            onClick={() => onMakeDefault(_id)}
                        >
                            Make Default
                        </button>
                    )}
                </div>
                
                <div className="action-group-secondary">
                    <button 
                        type="button" 
                        className="btn-edit" 
                        onClick={() => onEdit(address)}
                    >
                        Edit
                    </button>
                    <button 
                        type="button" 
                        className="btn-delete" 
                        onClick={() => onDelete(_id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddressCard