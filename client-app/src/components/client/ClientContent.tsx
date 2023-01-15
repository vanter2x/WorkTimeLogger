import { useState } from 'react';
import { FormState, FormContentState } from '../../app/layout/Content';
import { Client } from '../../app/models/client';
import { User } from '../../app/models/user';
import ContentAppBar from '../shared/ContentAppBar';
import ClientForm from './ClientForm';
import ClientList from './ClientList';

interface Props {
    contentState: FormContentState;
    contentFormStateHandler: (state: FormContentState) => void;
    selectedMenuId: number;
}

export default function ClientContent({ contentState, contentFormStateHandler, selectedMenuId }: Props) {

    const [editableClient, setEditableClient] = useState<Client | null>(null);

    const handleEditableClient = (client: Client | null) => {
        setEditableClient(client);
    }

    const renderClientContent = () => {
        switch (contentState) {

            case FormContentState.list:
                return (
                    <ClientList setClientToEdit={handleEditableClient} contentFormState={contentFormStateHandler} />
                );

            case FormContentState.new:
                return (
                    <ClientForm editClient={null} formUserState={FormState.create} contentFormState={contentFormStateHandler} />
                );

            case FormContentState.edit:
                return (
                    <ClientForm editClient={editableClient} formUserState={FormState.edit} contentFormState={contentFormStateHandler} />
                );

            default:
                return (<h2>Brak strony</h2>);
        }
    }

    return (
        <>
            <ContentAppBar selectedId={selectedMenuId} userFormStateHandler={contentFormStateHandler} />
            {renderClientContent()};
        </>
    )

}