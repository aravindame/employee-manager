import { EmployeeForm } from '@/components/EmployeeForm';
import Header from '@/components/Header';

/**
 * A Component that will responsible for rendering employee add page
 * @author Aravinda Meewalaarachchi
 *
 */
export default function EmployeeAddPage() {
  return (
    <main>
      <Header />
      <EmployeeForm />
    </main>
  );
}
