const Display = (props) => {
    

    return(
        props.persons
            .filter((person) => person.name.toLowerCase().includes(props.filter))
            .map((person) => <div key={person.name}>{person.name} {person.number}
            <button onClick={() => props.deleteContact(person)}>delete</button></div>)
        
    )
}

export default Display