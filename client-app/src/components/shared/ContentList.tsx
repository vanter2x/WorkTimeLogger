import { useState } from "react";
import { FormContentState } from "../../app/layout/Content";
import ClientList from "../client/ClientList";
import UserContent from "../user/UserContent";
import ContentAppBar from "./ContentAppBar";

interface Props {
    listId: number;
}

export default function ContentList({ listId }: Props) {

    const [formState, setFormState] = useState<FormContentState>(FormContentState.list)

    const handleContentState = (state: FormContentState) => {
        setFormState(state);
    }

    switch (listId) {
        case 0:
            return (
                <>
                    <ContentAppBar selectedId={listId} userFormStateHandler={handleContentState} />
                    <UserContent contentState={formState} contentFormStateHandler={handleContentState} />
                </>
            )
        case 1:
            return (
                <>
                    <ContentAppBar selectedId={listId} userFormStateHandler={handleContentState} />
                    <ClientList />
                </>
            )
        default:
            return (
                <h2>Brak rekordów</h2>
            )
    }
}