'use client';

import { EmployeeForm } from '@/components/EmployeeForm';
import Header from '@/components/Header';

/**
 * A Component that will responsible for rendering employee edit page
 * @author Aravinda Meewalaarachchi
 *
 */

export default function EmployeeEditPage({ params: { employeeId } }) {
  return (
    <main>
      <Header />
      <EmployeeForm employeeId={employeeId} />
    </main>
  );
}
