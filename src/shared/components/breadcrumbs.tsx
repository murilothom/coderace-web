import BreadcrumbsMUI from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
}

export type Breadcrumb = {
  text: string;
  href: string;
  icon?: React.ElementType;
};

interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
}

export default function Breadcrumbs({ breadcrumbs }: BreadcrumbsProps) {
  return (
    <div role="presentation" onClick={handleClick}>
      <BreadcrumbsMUI sx={{ color: 'text.primary' }}>
        {breadcrumbs.map((breadcrumb, index) => {
          if (index === breadcrumbs.length - 1) {
            return (
              <Typography
                key={breadcrumb.text}
                sx={{
                  color: 'text.primary',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {breadcrumb.icon && (
                  <breadcrumb.icon sx={{ mr: 0.5 }} fontSize="inherit" />
                )}
                {breadcrumb.text}
              </Typography>
            );
          }
          return (
            <Link
              key={breadcrumb.text}
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="text.primary"
              to={breadcrumb.href}
              component={RouterLink}
            >
              {breadcrumb.icon && (
                <breadcrumb.icon sx={{ mr: 0.5 }} fontSize="inherit" />
              )}
              {breadcrumb.text}
            </Link>
          );
        })}
      </BreadcrumbsMUI>
    </div>
  );
}
