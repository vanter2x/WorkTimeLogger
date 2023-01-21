import { useEffect, useState } from 'react';
import requestAgent from '../../app/api/requestAgent';
import { FormState, FormContentState } from '../../app/layout/Content';
import { Client } from '../../app/models/client';
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
    const [clients, setClients] = useState<Client[]>([]);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        requestAgent.Clients.list()
            .then((response) => {
                setClients(response);
            })
    }, []);

    function handleEditableClient(client: Client | null) {
        setEditableClient(client);
    }

    function handleCreateOrEditClient(client: Client) {
        setSubmitting(true);
        if (client.id) {
            requestAgent.Clients.update(client).then(() => {
                setClients([...clients.filter(u => u.id !== client.id), client]);
                setSubmitting(false);
            });
        } else {
            requestAgent.Clients.create(client).then(() => {
                setClients([...clients, client])
                setSubmitting(false);
            })
        }
    }

    function handleDeleteClient(id: number) {
        setSubmitting(true);
        requestAgent.Clients.delete(id).then(() => {
            setClients([...clients.filter(client => client.id !== id)])
            setEditableClient(null);
            setSubmitting(false);
        })
    }

    function renderClientContent() {
        switch (contentState) {

            case FormContentState.list:
                return (
                    <ClientList clientDeleteHandler={handleDeleteClient} clients={clients} setClientToEdit={handleEditableClient} contentFormState={contentFormStateHandler} />
                );

            case FormContentState.new:
                return (
                    <ClientForm submitting={submitting} clientHandler={handleCreateOrEditClient} editClient={null} formUserState={FormState.create} contentFormState={contentFormStateHandler} />
                );

            case FormContentState.edit:
                return (
                    <ClientForm submitting={submitting} clientHandler={handleCreateOrEditClient} editClient={editableClient} formUserState={FormState.edit} contentFormState={contentFormStateHandler} />
                );

            default:
                return (<h2>Brak strony</h2>);
        }
    }

    return (
        <>
            <ContentAppBar selectedId={selectedMenuId} userFormStateHandler={contentFormStateHandler} />
            {renderClientContent()}
        </>
    )

}