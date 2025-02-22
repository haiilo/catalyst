import { Dialog, DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Injection token for custom dialog sizes. The map should contain a key-value
 * pair of size names and their corresponding CSS width values. The key `default`
 * is used as the default size when no size is specified.
 */
export const CAT_DIALOG_SIZE_TOKEN = new InjectionToken<{ [key: string]: string }>('CatDialogSize');

/**
 * Configuration options for modal dialogs.
 */
export type CatDialogConfig<D = unknown> = Pick<
  DialogConfig<D>,
  'data' | 'disableClose' | 'height' | 'role' | 'width' | 'panelClass'
>;

/**
 * A service for managing modal dialogs.
 */
@Injectable({
  providedIn: 'root'
})
export class CatDialogService {
  constructor(
    private readonly dialog: Dialog,
    @Optional() @Inject(CAT_DIALOG_SIZE_TOKEN) private readonly size: { [key: string]: string } | null
  ) {}

  /**
   * Opens a modal dialog containing the given component.
   *
   * @param component The component to render as dialog content.
   * @param config The dialog configuration.
   * @returns The return value of the dialog.
   */
  open<R = unknown, D = unknown>(
    component: ComponentType<unknown>,
    config?: CatDialogConfig<D>
  ): Observable<R | undefined> {
    return this.openWithRef<R, D>(component, config).closed;
  }

  /**
   * Opens a modal dialog containing the given component and returns a reference to the dialog.
   *
   * @param component - The component to render as dialog content.
   * @param config - The dialog configuration.
   * @returns A reference to the just opened dialog.
   */
  openWithRef<R = unknown, D = unknown>(component: ComponentType<unknown>, config?: CatDialogConfig<D>): DialogRef<R> {
    const panelClass = config?.panelClass ?? [];
    return this.dialog.open<R, D>(component, {
      backdropClass: 'cat-backdrop',
      minWidth: 'clamp(240px, 100vw - 16px, 320px)',
      minHeight: 'clamp(144px, 100vh - 16px, 160px)',
      maxHeight: 'calc(100vh - 64px)',
      maxWidth: 'calc(100vw - 64px)',
      ...config,
      width: config?.width ? (this.size?.[config.width] ?? config.width) : (this.size?.['default'] ?? '600px'),
      panelClass: ['cat-dialog-pane', ...(Array.isArray(panelClass) ? panelClass : [panelClass])]
    });
  }

  /**
   * Closes all open dialogs.
   */
  closeAll(): void {
    this.dialog.closeAll();
  }
}
