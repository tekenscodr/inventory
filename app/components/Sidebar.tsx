'use client'
import { useRouter, usePathname } from "next/navigation";
import { cn } from "../../lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { logout } from "../actions/user";


const navLists = [
  { name: 'Home', href: '/dashboard/' },
  { name: 'Sales', href: '/dashboard/sales' },
  { name: 'Product', href: '/dashboard/product' },
  { name: 'Inventory', href: '/dashboard/inventory' },
]

const SideNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href;
  };
  return <div>
    <ul>
      {navLists.map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            className={cn('cursor-pointer px-3 py-3 rounded-md transition-colors duration-75 w-full block', {
              'bg-zinc-400/75': isActive(item.href),
              'hover:bg-zinc-500/75': true,
              'hover:!bg-zinc-400/75': isActive(item.href)
            })}
          >
            {item.name}
          </a>
        </li>
      ))}

      <Button
        className="mt-12"
        onClick={() => {
          router.push('/login');
          logout()
        }}>Logout</Button>

    </ul>

  </div>
}

export default SideNav