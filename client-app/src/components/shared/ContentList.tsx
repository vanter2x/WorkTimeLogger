import { useState } from "react";
import { FormContentState } from "../../app/layout/Content";
import ClientContent from "../client/ClientContent";
import UserContent from "../user/UserContent";

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
                    <UserContent contentState={formState} contentFormStateHandler={handleContentState} selectedMenuId={listId} />
                </>
            )
        case 1:
            return (
                <>
                    <ClientContent contentState={formState} contentFormStateHandler={handleContentState} selectedMenuId={listId} />
                </>
            )
        default:
            return (
                <h2>Brak rekordów</h2>
            )
    }
}