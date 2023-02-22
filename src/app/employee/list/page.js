import EmployeeList from '@/components/EmployeeList';
import Header from '@/components/Header';

/**
 * A Component that will responsible for rendering list all employee page
 *
 * @author Aravinda Meewalaarachchi
 *
 */

export default function EmployeeListPage() {
  return (
    <main>
      <Header />
      <EmployeeList />
    </main>
  );
}
