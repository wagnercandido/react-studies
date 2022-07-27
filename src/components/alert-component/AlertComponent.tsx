import { useEffect, useRef } from "react";
import { alertService, PropsAlert } from "../../services/AlertService";
import { Toast } from 'primereact/toast';

function AlertComponent() {
	const toast = useRef(null);

	useEffect(() => {
		const subscription = alertService.onAlert()
			.subscribe({
				next: (props: PropsAlert) => {
					toast.current.show({ severity: props.type, summary: props.title, detail: props.message, life: 3000 });
				}

			})

		return () => {
			subscription.unsubscribe();
		}
	})

	return (
		<Toast ref={toast} />
	);
}

export { AlertComponent };