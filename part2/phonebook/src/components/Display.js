const Display = (props) => {
    return(
        props.persons
            .filter((person) => person.name.toLowerCase().includes(props.filter))
            .map((person) => <p key={person.name}>{person.name} {person.number}</p>)
        
    )
}

export default Display