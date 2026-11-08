import React, { Component, useState } from "react";
class PanelBoundary extends Component {
    state = { failed: false };
    static getDerivedStateFromError() { return { failed: true }; }
    render() {
        if (this.state.failed)
            return <section role="alert"><p>Session details could not be shown.</p><button onClick={() => this.setState({ failed: false })}>Try again</button></section>;
        return this.props.children;
    }
}
function VisitNote() {
    const [note, setNote] = useState("");
    return <label>Visit note<input value={note} onChange={event => setNote(event.target.value)}/></label>;
}
function SessionDetails() {
    const [broken, setBroken] = useState(false);
    if (broken)
        throw new Error("Prepared session-panel failure.");
    return <section><h2>Morning session</h2><p>10:00–12:00 · Clay and Colour</p><button onClick={() => setBroken(true)}>Break session panel</button></section>;
}
export default function App() {
    return <main><h1>Plan your studio visit</h1><VisitNote /><PanelBoundary><SessionDetails /></PanelBoundary></main>;
}
